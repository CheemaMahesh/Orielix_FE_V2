import { useState } from "react";
import { config } from "../Hooks";
import axios from "axios";

type Loading = {
  event: boolean;
  deleteEvent: boolean;
  editEvent: boolean;
};

const LOADING_INITIAL_STATE: Loading = {
  event: false,
  deleteEvent: false,
  editEvent: false,
};

export type createEventPayloadType = {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventImage: string;
  eventTime: string;
  eventLocation: string;
  presenterId: string;
};

export const useAdminEvents = () => {
  const baseUrl = config.apiUrl;
  const token = localStorage.getItem("token");
  const [isLoading, setLoading] = useState<Loading>(LOADING_INITIAL_STATE);

  const updateLoading = (type: keyof Loading, value: boolean) => {
    setLoading((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const createEvent = async ({
    payload,
  }: {
    payload: createEventPayloadType;
  }) => {
    try {
      updateLoading("event", true);
      const response = await axios.post(
        `${baseUrl}/api/v1/event/create`,
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
      updateLoading("event", false);
    }
  };

  return {
    isLoading,
    createEvent,
  };
};
