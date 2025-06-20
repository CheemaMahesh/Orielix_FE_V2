import { EventType } from "@/reducers/events";
import { UserResponse } from "@/reducers/me";
import axios from "axios";
import { useState } from "react";
import { config } from "../Hooks";
import { IntrestType } from "@/reducers/Intrests";

type ProfileLoading = {
  me: boolean;
  joinevent: boolean;
  event: boolean;
  leaveEvent: boolean;
  session: boolean;
  joinsession: boolean;
  intrest: boolean;
  role: boolean;
  intrestupdate: boolean;
  intrestDelete: boolean;
  updateBio: boolean;
  updateNames: boolean;
  loginWithGoogle: boolean;
  updateSocialLinks: boolean;
  onboardingFirstStep: boolean;
  updateEducation: boolean;
  updateAddress: boolean;
  getRankings: boolean;
  getAllNotifications?: boolean;
  markNotificationAsRead?: boolean;
  getProfileKeys?: boolean;
  updateImage?: boolean;
  getOtp?: boolean;
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

export type GoogleLogin = {
  data: { success: boolean; message: string; token: string };
};

export type OnboardingFirstStep = {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
};

export type AddressProps = {
  address?: string;
  city: string;
  state: string;
  country: string;
  zinPinCode: string;
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
    role: false,
    intrestupdate: false,
    intrestDelete: false,
    updateBio: false,
    updateNames: false,
    loginWithGoogle: false,
    updateSocialLinks: false,
    onboardingFirstStep: false,
    updateEducation: false,
    updateAddress: false,
    getRankings: false,
    getAllNotifications: false,
    markNotificationAsRead: false,
    getProfileKeys: false,
    updateImage: false,
    getOtp: false,
  });
  const handleLoading = (type: string, value: boolean) => {
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
      return null;
    }
  };

  const getAllEvents = async ({
    type,
  }: {
    type?: string;
  }): Promise<EventResponse | null> => {
    try {
      handleLoading("event", true);
      const response = await axios.get(
        `${config.apiUrl}/api/v1/user/getallevents${
          type ? `?eventType=${type}` : ""
        }`,
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
      console.log("Error during leaveEvent:", err);
    } finally {
      handleLoading("leaveEvent", false);
    }
  };

  const getAllSessions = async ({
    category,
    type,
  }: {
    category?: string;
    type?: string;
  }) => {
    try {
      handleLoading("session", true);

      // Build query params if present
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (type) params.append("type", type);

      const url = `${config.apiUrl}/api/v1/user/getallsessions${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const getAllRoles = async () => {
    try {
      handleLoading("role", true);
      const response = await axios.get(
        `${config.apiUrl}/api/v1/user/getallroles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during getAllRoles:", err);
    } finally {
      handleLoading("role", false);
    }
  };

  const updateIntrest = async (interests: IntrestType[]) => {
    try {
      handleLoading("intrestupdate", true);
      const response = await axios.post(
        `${config.apiUrl}/api/v1/user/intrest/update`,
        {
          interests: interests?.map((interest) => interest.id),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during updateIntrest:", err);
    } finally {
      handleLoading("intrestupdate", false);
    }
  };

  const deleteIntrest = async (id: string) => {
    try {
      handleLoading("intrestDelete", true);
      const response = await axios.delete(
        `${config.apiUrl}/api/v1/user/delete/intrest/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during deleteIntrest:", err);
    } finally {
      handleLoading("intrestDelete", false);
    }
  };

  const updateBio = async (bio: string) => {
    try {
      handleLoading("updateBio", true);
      const response = await axios.patch(
        `${config.apiUrl}/api/v1/user/update/bio`,
        {
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during updateBio:", err);
    } finally {
      handleLoading("updateBio", false);
    }
  };

  const updateNames = async ({
    firstName,
    lastName,
  }: {
    firstName: string;
    lastName?: string;
  }) => {
    try {
      handleLoading("updateNames", true);
      const response = await axios.patch(
        `${config.apiUrl}/api/v1/user/update/names`,
        {
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during updateNames:", err);
    } finally {
      handleLoading("updateNames", false);
    }
  };

  const loginWithGoogle = async ({ email, firstName, profileImage }) => {
    try {
      handleLoading("loginWithGoogle", true);
      const response: GoogleLogin = await axios.post(
        `${config.apiUrl}/api/v1/user/google`,
        {
          email,
          firstName,
          profileImage,
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during Google Login:", err);
    } finally {
      handleLoading("loginWithGoogle", false);
    }
  };

  const updateSocialLinks = async ({
    portfolioLink,
    githubLink,
    linkedinLink,
  }: {
    portfolioLink: string;
    githubLink: string;
    linkedinLink: string;
  }) => {
    try {
      handleLoading("updateSocialLinks", true);
      const response = await axios.patch(
        `${config.apiUrl}/api/v1/user/update/social`,
        { portfolioLink, githubLink, linkedinLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during updateSocialLinks:", err);
    } finally {
      handleLoading("updateSocialLinks", false);
    }
  };

  const onboardingFirstStep = async (data: OnboardingFirstStep) => {
    try {
      handleLoading("onboardingFirstStep", true);
      const response = await axios.patch(
        `${config.apiUrl}/api/v1/user/firststep`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during onboardingFirstStep:", err);
    } finally {
      handleLoading("onboardingFirstStep", false);
    }
  };

  const updateEducation = async (data) => {
    try {
      handleLoading("updateEducation", true);
      const response = await axios.patch(
        `${config.apiUrl}/api/v1/user/education`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during updateEducation:", err);
    } finally {
      handleLoading("updateEducation", false);
    }
  };

  const updateAddress = async (payload: AddressProps) => {
    try {
      handleLoading("updateAddress", true);
      const response = await axios.patch(
        `${config.apiUrl}/api/v1/user/update/address`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during updateAddress:", err);
    } finally {
      handleLoading("updateAddress", false);
    }
  };

  const getRankings = async () => {
    try {
      handleLoading("getRankings", true);
      const response = await axios.get(
        `${config.apiUrl}/api/v1/user/rankings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during getRankings:", err);
    } finally {
      handleLoading("getRankings", false);
    }
  };

  const getAllNotifications = async (userid: string) => {
    try {
      handleLoading("getAllNotifications", true);
      const response = await axios.get(
        `${config.apiUrl}/api/v1/notifications/getall/${userid}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during getAllNotifications:", err);
    } finally {
      handleLoading("getAllNotifications", false);
    }
  };

  const markNotificationAsRead = async (
    notificationId: string
  ): Promise<{ success: boolean; message: string } | null> => {
    try {
      handleLoading("markNotificationAsRead", true);
      const response = await axios.patch(
        `${config.apiUrl}/api/v1/notifications/markasread/${notificationId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during markNotificationAsRead:", err);
      return null;
    } finally {
      handleLoading("markNotificationAsRead", false);
    }
  };

  const getProfileKeys = () => {
    try {
      // /upload/profilekeys
      handleLoading("getProfileKeys", true);
      const res = axios.get(`${config.apiUrl}/api/v1/user/upload/profilekeys`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (err) {
      console.log("Error during getProfileKeys:", err);
    } finally {
      handleLoading("getProfileKeys", false);
    }
  };

  const updateImage = async ({
    profileImage,
    id,
  }: {
    profileImage: string;
    id: string;
  }) => {
    try {
      handleLoading("updateImage", false);
      const response = await axios.patch(
        `${config.apiUrl}/api/v1/user/upload/profile`,
        {
          profileImage,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log("Error during updateImage:", err);
    } finally {
      handleLoading("updateImage", false);
    }
  };

  const getOtp = async (email: string) => {
    try {
      const response = await axios.get(
        `${config.apiUrl}/api/v1/user/getOtp?email=${email}`
      );
      return response.data;
    } catch (err) {
      console.log("Error during getOtp:", err);
    } finally {
      handleLoading("getOtp", false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/v1/user/verifyOtp`,
        { email, otp }
      );
      return response.data;
    } catch (err) {
      console.log("Error during verifyOtp:", err);
    } finally {
      handleLoading("getOtp", false);
    }
  };

  const updatePassword = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/api/v1/user/updatepassword`,
        { email, password }
      );
      return response.data;
    } catch (err) {
      console.log("Error during updatePassword:", err);
      return { success: false, message: "Failed to update password" };
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
    getAllRoles,
    updateIntrest,
    deleteIntrest,
    updateBio,
    updateNames,
    loginWithGoogle,
    updateSocialLinks,
    onboardingFirstStep,
    updateEducation,
    updateAddress,
    getRankings,
    getAllNotifications,
    markNotificationAsRead,
    getProfileKeys,
    updateImage,
    getOtp,
    verifyOtp,
  };
};
