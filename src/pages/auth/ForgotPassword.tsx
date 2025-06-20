import { useProfile } from "@/Api/Profile";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/store";
import { message } from "antd";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setOtpSentToEmail, setOtpVerified } from "@/reducers/auth";
import axios from "axios";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  // todo --> get  key from local storage called isOtpSentToEmail
  const { isOtpSentToEmail, isOtpVerified } = useSelector((state: RootState) => state.auth);

  console.log("isOtpSentToEmail", isOtpSentToEmail);

  const { getOtp, isLoading: isOtpLoading, verifyOtp } = useProfile();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const sendOtp = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      message.error("Please enter a valid email address.");
      return;
    }
    const res = await getOtp(email);
    if (res.success) {
      dispatch(setOtpSentToEmail(true));
      setIsSubmitted(true);
      message.success("OTP sent to your email.");
    } else {
      message.error(res?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      message.error("Please enter a valid 6-digit OTP.");
      return;
    }
    // Call your verifyOtp API here
    const res = await verifyOtp(email, otp);
    if (res.success) {
      dispatch(setOtpVerified(true));
      message.success("OTP verified! You can now reset your password.");
    } else {
      message.error(res?.message || "Invalid OTP. Please try again.");
    }
  };

  // Local function to change password
  const changePassword = async (email: string, password: string, otp: string) => {
    try {
      // Replace with your actual API endpoint
      const res = await axios.post("/api/v1/user/change-password", { email, password, otp });
      return res.data;
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      return { success: false, message: error?.response?.data?.message || "Unknown error" };
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword.length < 8 || newPassword.length > 40) {
      message.error("Password must be between 8 and 40 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match.");
      return;
    }
    const res = await changePassword(email, newPassword, otp);
    if (res.success) {
      message.success("Password changed successfully! Please login.");
      setTimeout(() => {
        window.location.replace("/login");
      }, 1200);
    } else {
      message.error(res?.message || "Failed to change password.");
    }
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
                {!isOtpSentToEmail
                  ? "Enter your email and we'll send you instructions to reset your password"
                  : isOtpVerified
                    ? "OTP verified! You can now reset your password."
                    : "Enter the 6-digit OTP sent to your email"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isOtpSentToEmail ? (
                <>
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
                    type="button"
                    disabled={isOtpLoading.getOtp}
                    className="w-full py-6 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-base font-medium"
                  >
                    Send OTP
                  </Button>
                </>
              ) : !isOtpVerified ? (
                <>
                  <Label htmlFor="otp">Enter OTP</Label>
                  <div className="flex gap-2 justify-center">
                    {[...Array(6)].map((_, idx) => (
                      <Input
                        key={idx}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="w-10 h-12 text-center text-lg rounded-lg"
                        value={otp[idx] || ""}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/, "");
                          if (!val) return;
                          const newOtp = otp.split("");
                          newOtp[idx] = val;
                          setOtp(newOtp.join("").slice(0, 6));
                          // Auto-focus next input
                          const next = document.getElementById(`otp-input-${idx + 1}`);
                          if (next) (next as HTMLInputElement).focus();
                        }}
                        id={`otp-input-${idx}`}
                      />
                    ))}
                  </div>
                  <Button
                    onClick={handleVerifyOtp}
                    type="button"
                    className="w-full py-6 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-base font-medium mt-4"
                  >
                    Verify OTP
                  </Button>
                </>
              ) : (
                // Show change password form after OTP is verified
                <div className="flex flex-col gap-4">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    minLength={8}
                    maxLength={40}
                    className="h-12 px-4 rounded-xl"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                  />
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    minLength={8}
                    maxLength={40}
                    className="h-12 px-4 rounded-xl"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    onClick={handleUpdatePassword}
                    className="w-full py-6 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-base font-medium mt-2"
                  >
                    Change Password
                  </Button>
                </div>
              )}
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
    </div>
  );
};

export default ForgotPassword;