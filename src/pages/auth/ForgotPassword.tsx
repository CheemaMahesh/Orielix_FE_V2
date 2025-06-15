import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useProfile } from "@/Api/Profile";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { getOtp, isLoading: isOtpLoading } = useProfile();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Here you would typically handle password reset logic
    // For demo, just simulate a loading state and success

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // In a real app, you'd handle error cases too
    }, 1500);
  };

  const sendOtp = async () => {
    await getOtp(email);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <div className="pt-36 pb-20 px-6">
        <div className="max-w-md mx-auto">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                  </svg>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Reset Password</CardTitle>
              <CardDescription className="text-gray-500">
                {!isSubmitted ?
                  "Enter your email and we'll send you instructions to reset your password" :
                  "Check your email for instructions to reset your password"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 px-4 rounded-xl"
              />

              <Button
                onClick={sendOtp}
                type="submit"
                disabled={isOtpLoading.getOtp}
                className="w-full py-6 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-base font-medium"
              >
                Send OTP
              </Button>

            </CardContent>
            <CardFooter className="flex items-center justify-center p-6 pt-0">
              <p className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link to="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                  Back to login
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div >
  );
};

export default ForgotPassword; 