import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [verificationCode, setVerificationCode] = useState("");
  const [inputs, setInputs] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Get the email from location state or use a default
  const email = location.state?.email || "";
  
  // Start countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  // Handle verification code submission
  const handleVerify = async () => {
    setIsVerifying(true);
    
    // Here you would typically call an API to verify the code
    // For demo, just simulate a verification process
    
    setTimeout(() => {
      const fullCode = inputs.join("");
      setIsVerifying(false);
      
      // For demo, any 6-digit code is valid
      if (fullCode.length === 6) {
        toast({
          title: "Email verified successfully!",
          description: "Your account has been verified.",
          variant: "default",
          className: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0"
        });
        navigate("/onboarding");
      } else {
        toast({
          title: "Invalid verification code",
          description: "The code you entered is invalid. Please try again.",
          variant: "destructive",
        });
      }
    }, 1500);
  };
  
  // Handle resend code
  const handleResendCode = () => {
    setIsLoading(true);
    
    // Here you would typically call an API to resend the code
    // For demo, just simulate sending
    
    setTimeout(() => {
      setIsLoading(false);
      setCountdown(60);
      toast({
        title: "Verification code sent!",
        description: `A new verification code has been sent to ${email}`,
        variant: "default",
        className: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0"
      });
    }, 1500);
  };
  
  // Handle input change and auto-focus to next input
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }
    
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    setVerificationCode(newInputs.join(""));
    
    // Auto focus to next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`verification-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  
  // Handle backspace to go to previous input
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && inputs[index] === "") {
      const prevInput = document.getElementById(`verification-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
  
  // Mask email for privacy
  const maskEmail = (email: string) => {
    if (!email) return "";
    const parts = email.split("@");
    if (parts.length !== 2) return email;
    
    const namePart = parts[0];
    const domainPart = parts[1];
    
    let maskedName = namePart;
    if (namePart.length > 2) {
      maskedName = namePart.charAt(0) + "*".repeat(namePart.length - 2) + namePart.charAt(namePart.length - 1);
    }
    
    return `${maskedName}@${domainPart}`;
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="max-w-md w-full px-4 sm:px-6 overflow-y-auto max-h-screen py-4 sm:py-6">
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl">
          <CardHeader className="space-y-1 text-center pb-4 sm:pb-6">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold tracking-tight">Verify your email</CardTitle>
            <CardDescription className="text-gray-500 text-sm sm:text-base">
              We've sent a verification code to {maskEmail(email)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            <div className="flex justify-center space-x-1 sm:space-x-2">
              {inputs.map((value, index) => (
                <Input
                  key={index}
                  id={`verification-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  autoComplete="one-time-code"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-10 w-10 sm:h-14 sm:w-14 text-center text-lg sm:text-xl font-semibold rounded-xl focus:border-purple-500 focus:ring-purple-500"
                />
              ))}
            </div>
            
            <Button 
              onClick={handleVerify}
              disabled={verificationCode.length !== 6 || isVerifying}
              className="w-full py-5 sm:py-6 h-11 sm:h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-sm sm:text-base font-medium"
            >
              {isVerifying ? (
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : "Verify Email"}
            </Button>
            
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Didn't receive the code?</p>
              <Button
                variant="link"
                onClick={handleResendCode}
                disabled={countdown > 0 || isLoading}
                className="p-0 h-auto text-purple-600 hover:text-purple-800 text-sm sm:text-base font-medium"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : countdown > 0 ? (
                  `Resend code in ${countdown}s`
                ) : (
                  "Resend code"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;