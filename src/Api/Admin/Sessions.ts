import { useState } from "react";
import { config } from "../Hooks";
import axios from "axios";

type Loading = {
  session: boolean;
  deleteSession: boolean;
  editSession: boolean;
};

const LOADING_INITIAL_STATE: Loading = {
  session: false,
  deleteSession: false,
  editSession: false,
};

export type createSessionPayloadType = {
  name: string;
  description: string;
  date: string;
  image: string;
  time: string;
  location: string;
  presenterId: string;
  duration: string;
  id: string;
  category?: string;
  type?: string;
};

export const useAdminSessions = () => {
  const baseUrl = config.apiUrl;
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState<Loading>(LOADING_INITIAL_STATE);

  const updateLoading = (type: keyof Loading, value: boolean) => {
    setLoading((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const createSession = async ({
    payload,
  }: {
    payload: createSessionPayloadType;
  }) => {
    try {
      updateLoading("session", true);
      const response = await axios.post(
        `${baseUrl}/api/v1/session/create`,
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
      updateLoading("session", false);
    }
  };

  const deleteSession = async (id: string) => {
    try {
      const payload = { isDeleted: true, sessionId: id };
      updateLoading("deleteSession", true);
      const response = await axios.patch(
        `${baseUrl}/api/v1/session/update`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error deleting Session:", err);
      throw err;
    } finally {
      updateLoading("deleteSession", false);
    }
  };

  const editSession = async (
    payload: Omit<createSessionPayloadType, "id"> & { sessionId: string }
  ) => {
    try {
      updateLoading("editSession", true);
      const response = await axios.patch(
        `${baseUrl}/api/v1/session/update`,
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
      console.error("Error updating Session:", error);
      throw error;
    } finally {
      updateLoading("editSession", false);
    }
  };
  return {
    isLoading,
    createSession,
    deleteSession,
    editSession,
  };
};
