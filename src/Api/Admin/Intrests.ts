import { config } from "../Hooks";

export type AddIntrest = {
  name: string;
  description: string;
};

export const useAdminIntrests = () => {
  const baseUrl = config.apiUrl;
  const token = localStorage.getItem("token");
  const createIntrest = async ({ name, description }: AddIntrest) => {
    try {
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
    }
  };

  return { createIntrest };
};
