import { EventType } from "@/reducers/events";
import { UserResponse } from "@/reducers/me";
import axios from "axios";
import { useState } from "react";
import { config } from "../Hooks";

type ProfileLoading = {
  me: boolean;
  joinevent: boolean;
  event: boolean;
  leaveEvent: boolean;
  session: boolean;
  joinsession: boolean;
  intrest: boolean;
};

export type MeResponse = {
  success: boolean;
  message: string;
  user: UserResponse["user"];
};

export type EventResponse = {
  success: boolean;
  message: string;
  events: EventType[];
};

const token = localStorage.getItem("token");

export const useProfile = () => {
  const [isLoading, setIsLoading] = useState<ProfileLoading>({
    me: false,
    joinevent: false,
    event: false,
    leaveEvent: false,
    session: false,
    joinsession: false,
    intrest: false,
  });
  const handleLoading = (type: string, value: boolean) => {
    console.log("Loading state changed:", type, value);
    setIsLoading((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const getMe = async (): Promise<MeResponse | null> => {
    try {
      if (!token) {
        console.error("No token found");
        return null;
      }
      handleLoading("me", true);
      const response = await axios.get(`${config.apiUrl}/api/v1/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleLoading("me", false);
      console.log("Error during getMe:", error);
      return null;
    }
  };

  const getAllEvents = async (): Promise<EventResponse | null> => {
    try {
      handleLoading("event", true);
      const response = await axios.get(
        `${config.apiUrl}/api/v1/user/getallevents`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleLoading("event", false);
      return response.data;
    } catch (err) {
      handleLoading("event", false);
      console.log("Error during getAllEvents:", err);
    }
  };

  const joinEvent = async (id: string) => {
    try {
      handleLoading("joinevent", true);
      const response = await axios.post(
        `${config.apiUrl}/api/v1/user/join/event/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleLoading("joinevent", false);
      return response.data;
    } catch (err) {
      handleLoading("joinevent", false);
      console.log("Error during joinEvent:", err);
      return { success: false, message: "Failed to join event" };
    }
  };

  const leaveEvent = async (id: string) => {
    try {
      handleLoading("leaveEvent", true);
      const response = await axios.post(
        `${config.apiUrl}/api/v1/user/leave/event/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleLoading("leaveEvent", false);
      return response.data;
    } catch (err) {
      handleLoading("leaveEvent", false);
      console.log("Error during leaveEvent:", err);
    }
  };

  const getAllSessions = async () => {
    try {
      handleLoading("session", true);
      const response = await axios.get(
        `${config.apiUrl}/api/v1/user/getallsessions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during getAllSessions:", err);
    } finally {
      handleLoading("getallsessions", false);
    }
  };

  const joinSession = async (id: string) => {
    try {
      handleLoading("joinsession", true);
      const response = await axios.post(
        `${config.apiUrl}/api/v1/user/join/session/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during joinSession:", err);
    } finally {
      handleLoading("joinsession", false);
    }
  };

  const getAllIntrests = async () => {
    try {
      handleLoading("intrest", true);
      const response = await axios.get(
        `${config.apiUrl}/api/v1/user/getallintrest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during getAllIntrests:", err);
    } finally {
      handleLoading("intrest", false);
    }
  };

  return {
    isLoading,
    getMe,
    getAllEvents,
    joinEvent,
    leaveEvent,
    getAllSessions,
    joinSession,
    getAllIntrests,
  };
};
