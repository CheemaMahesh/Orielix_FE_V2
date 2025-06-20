import axios from "axios";
import { config } from "./index";
import { useState } from "react";

interface LoginPayload {
  email: string;
  password: string;
}

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  message: string;
  success: boolean;
  user?: {
    username?: string;
    email?: string;
  };
  status?: number;
};

export type authenticateUserLoading = {
  isLoginLoading: boolean;
  signup: boolean;
};

const INITIAL_LOADING_STATE: authenticateUserLoading = {
  isLoginLoading: false,
  signup: false,
};

export const useAuthenticateUser = () => {
  const [isLoading, setIsLoading] = useState<authenticateUserLoading>(
    INITIAL_LOADING_STATE
  );

  const handleLoading = (type: string, value: boolean) => {
    setIsLoading((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const login = async (
    payload: LoginPayload
  ): Promise<LoginResponse | null> => {
    try {
      handleLoading("isLoginLoading", true);
      const response = await axios.post(
        `${config.apiUrl}/api/v1/user/login`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      handleLoading("isLoginLoading", false);
    }
  };

  const signup = async (
    payload: SignupPayload
  ): Promise<LoginResponse | null> => {
    try {
      handleLoading("signup", true);
      const response = await axios.post(
        `${config.apiUrl}/api/v1/user/signup`,
        payload
      );
      handleLoading("signup", false);
      return response.data;
    } catch (error) {
      handleLoading("signup", false);
      console.error("Error during login:", error);
    }
  };

  return {
    login,
    isLoading,
    signup,
  };
};
