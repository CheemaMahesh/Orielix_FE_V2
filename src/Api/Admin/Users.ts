import { useState } from "react";
import { config } from "../Hooks";
import axios from "axios";
import { AllUserResponse } from "@/reducers/users";

type Loading = {
  user: boolean;
  deleteUser: boolean;
  editUser: boolean;
  getUser: boolean;
};

const LOADING_INITIAL_STATE: Loading = {
  user: false,
  deleteUser: false,
  editUser: false,
  getUser: false,
};

type createPayloadType = {
  email: string;
  password: string;
  username: string;
};

export const useAdminUsers = () => {
  const baseUrl = config.apiUrl;
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState<Loading>(LOADING_INITIAL_STATE);

  const updateLoading = (type: keyof Loading, value: boolean) => {
    setLoading((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const createUser = async (payload: createPayloadType) => {
    try {
      updateLoading("user", true);
      const response = await axios.post(
        `${baseUrl}/api/v1/events/create`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    } finally {
      updateLoading("user", false);
    }
  };

  const getAllUsers = async (): Promise<AllUserResponse | null> => {
    try {
      updateLoading("getUser", true);
      const response = await axios.get(`${baseUrl}/api/v1/user/getall`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    } finally {
      updateLoading("getUser", false);
    }
  };

  return {
    isLoading,
    createUser,
    getAllUsers,
  };
};
