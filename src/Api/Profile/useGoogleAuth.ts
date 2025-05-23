import { useToast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";
import { useProfile } from "./index";
import { useState } from "react";

export type GoogleCreds = {
  clientId?: string;
  credential?: string;
  select_by?: string;
};

export type TypeDecodesRes = {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
};

export const useGoogleAuth = () => {
  const { toast } = useToast();
  const { loginWithGoogle } = useProfile();
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const handleGoogleLoginSuccess = async (credentialResponse: GoogleCreds) => {
    try {
      setIsGoogleLoading(true);
      const decodesRes: TypeDecodesRes = jwtDecode(
        credentialResponse.credential || ""
      );
      const { email, name, picture } = decodesRes;
      const res = await loginWithGoogle({
        email,
        firstName: name,
        profileImage: picture,
      });
      if (res.success) {
        toast({
          title: "Login successful!",
          variant: "default",
        });
        localStorage.setItem("token", res.token);
        window.location.replace("/dashboard");
      }
    } catch (err) {
      console.error("Error while login with Google", err);
      toast({
        title: "Login Failed!",
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return { handleGoogleLoginSuccess, isGoogleLoading };
};
