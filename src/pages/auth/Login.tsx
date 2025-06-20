import { LoginResponse, useAuthenticateUser } from "@/Api/Hooks/useAuth";
import { useGoogleAuth } from "@/Api/Profile/useGoogleAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";


type LoginTypes = {
  email: string;
  password: string;
}

const Login = () => {
  const { toast } = useToast();
  const { login, isLoading } = useAuthenticateUser();
  const [userData, setUserData] = useState<LoginTypes>({
    email: "",
    password: "",
  });
  const { handleGoogleLoginSuccess, isGoogleLoading } = useGoogleAuth();

  const handleChangeDetails = (type: string, value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }


  const handleLoginWithAPI = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Password length
    if (!userData.password || userData.password.length < 8 || userData.password.length > 40) {
      message.error("Password must be between 8 and 40 characters.");
      return;
    }

    // Validation: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailRegex.test(userData.email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    try {
      const res: LoginResponse = await login({ email: userData.email, password: userData.password });
      if (res.success) {
        message.success(`Welcome back, ${res.user?.username}!`);
        localStorage.setItem("token", res.token);
        window.location.replace("/dashboard");
      } else {
        message.error(res?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      message.error("Login Failed! Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="max-w-md w-full px-6 overflow-y-auto max-h-screen py-6">
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardHeader className="space-y-1 text-center pb-4">
            <div className="flex justify-center mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight">Welcome back!</CardTitle>
            <CardDescription className="text-gray-500">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-4">
            <form onSubmit={handleLoginWithAPI}>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={userData.email}
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={(e) => handleChangeDetails("email", e.target.value)}
                    required
                    className="h-10 px-3 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={userData.password}
                    // onChange={(e) => setPassword(e.target.value)}
                    onChange={(e) => handleChangeDetails("password", e.target.value)}
                    required
                    className="h-10 px-3 rounded-lg"
                  />
                  <div className="flex justify-end mt-1">
                    <Link to="/forgot-password" className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading.isLoginLoading}
                  className="w-full py-5 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-sm font-medium"
                >
                  {isLoading.isLoginLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Sign In"}
                </Button>
              </div>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              {isGoogleLoading ? <Button
                isLoading={isGoogleLoading}
                variant="outline"
                className="w-full h-10 py-5 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all font-medium flex items-center justify-center gap-2 text-sm"
              >
                <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                <span>Google</span>
              </Button> :
                <GoogleLogin
                  width={365}
                  onSuccess={(e) => handleGoogleLoginSuccess(e)}
                  onError={() => console.error("Error while login")}
                  size="large"
                  logo_alignment="center"
                />
              }
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-center p-4 pt-0">
            <p className="text-center text-xs text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-600 hover:text-purple-800 font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;