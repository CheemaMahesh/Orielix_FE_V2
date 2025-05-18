import { useState } from "react";
import { config } from "../Hooks";
import axios from "axios";

export type AddIntrest = {
  name: string;
  description: string;
};

type Loading = {
  intrest: boolean;
  deleteIntrest: boolean;
  editIntrest: boolean;
};

export const useAdminIntrests = () => {
  const baseUrl = config.apiUrl;
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState<Loading>({
    intrest: false,
    deleteIntrest: false,
    editIntrest: false,
  });
  const updateLoading = (type: keyof Loading, value: boolean) => {
    setLoading((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const createIntrest = async ({ name, description }: AddIntrest) => {
    try {
      updateLoading("intrest", true);
      const response = await axios.post(
        `${baseUrl}/api/v1/preferences/intrest/create`,
        { name, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating intrest:", error);
      throw error;
    } finally {
      updateLoading("intrest", false);
    }
  };

  const deleteIntrest = async (id: string) => {
    try {
      updateLoading("deleteIntrest", true);
      const response = await axios.patch(
        `${baseUrl}/api/v1/preferences/intrest/update`,
        { intrestId: id, isDeleted: true },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error updating intrest:", err);
      throw err;
    } finally {
      updateLoading("deleteIntrest", false);
    }
  };

  const editIntrest = async ({ id, name, description }) => {
    try {
      updateLoading("editIntrest", true);
      const response = await axios.patch(
        `${baseUrl}/api/v1/preferences/intrest/update`,
        { intrestId: id, name, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error updating intrest:", err);
      throw err;
    } finally {
      updateLoading("editIntrest", false);
    }
  };

  return { createIntrest, deleteIntrest, isLoading, editIntrest };
};
