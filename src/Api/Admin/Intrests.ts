import { useState } from "react";
import { config } from "../Hooks";

export type AddIntrest = {
  name: string;
  description: string;
};

type Loading = {
  intrest: boolean;
};

export const useAdminIntrests = () => {
  const baseUrl = config.apiUrl;
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState<Loading>({
    intrest: false,
  });
  const updateLoading = (type: string, value: boolean) => {
    setLoading((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const createIntrest = async ({ name, description }: AddIntrest) => {
    try {
      updateLoading("intrest", true);
      const response = await fetch(
        `${baseUrl}/api/v1/preferences/intrest/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create intrest");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating intrest:", error);
      throw error;
    } finally {
      updateLoading("intrest", false);
    }
  };

  return { createIntrest, isLoading };
};
