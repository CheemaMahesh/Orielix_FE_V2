import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthenticateUser } from "@/Api/Hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/Api/Profile/useGoogleAuth";
import { message } from "antd";

type RegisterValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { signup, isLoading } = useAuthenticateUser();
  const [registerValues, setRegisterValues] = useState<RegisterValues>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { handleGoogleLoginSuccess, isGoogleLoading } = useGoogleAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (registerValues.password !== registerValues.confirmPassword) {
        message.error("Passwords do not match");
        return;
      }
      if (registerValues.username.length < 3) {
        message.error("Username must be at least 3 characters");
        return;
      }
      if (registerValues.password.length < 8) {
        message.error("Password must be at least 8 characters");
        return;
      }
      if (
        registerValues.email.length < 4 ||
        !registerValues.email.includes("@") ||
        !registerValues.email.includes(".")
      ) {
        message.error("Incorrect email format");
        return;
      }

      const res = await signup({
        email: registerValues.email,
        password: registerValues.password,
        username: registerValues.username,
      });
      if (res?.success) {
        message.success("Registration successful. You can now log in to your account.");
        localStorage.setItem("token", res.token);
        window.location.replace("/dashboard");
      } else {
        message.error(res?.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      message.error("An error occurred while registering. Please try again.");
    }
  };


  const handleValueChange = ({ type, value }: { type: string; value: string }) => {
    setRegisterValues((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="max-w-md w-full px-6 overflow-y-auto max-h-screen py-6">
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardHeader className="space-y-1 text-center pb-4">
            <div className="flex justify-center mb-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-xl font-bold tracking-tight">Create an account</CardTitle>
            <CardDescription className="text-gray-500">
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 px-4">
            <form onSubmit={handleRegister}>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name">Create username</Label>
                  <Input
                    id="name"
                    placeholder="username"
                    value={registerValues.username}
                    onChange={(e) => handleValueChange({ type: "username", value: e.target.value })}
                    required
                    className="h-10 px-3 rounded-lg"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    value={registerValues.email}
                    onChange={(e) => handleValueChange({ type: "email", value: e.target.value })}
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
                    value={registerValues.password}
                    onChange={(e) => handleValueChange({ type: "password", value: e.target.value })}
                    required
                    className="h-10 px-3 rounded-lg"
                  />
                  <p className="text-xs text-gray-500">Password must be at least 8 characters</p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={registerValues.confirmPassword}
                    onChange={(e) => handleValueChange({ type: "confirmPassword", value: e.target.value })}
                    required
                    className="h-10 px-3 rounded-lg"
                  />
                </div>

                <div className="flex items-center space-x-2 my-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="data-[state=checked]:bg-purple-600"
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-purple-600 hover:text-purple-800 font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading.signup || !acceptTerms}
                  className="w-full py-5 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg text-sm font-medium"
                >
                  {isLoading.signup ? (
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Sign Up"}
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
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;