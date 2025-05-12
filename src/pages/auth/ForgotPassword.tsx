import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

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
              {!isSubmitted ? (
                <form onSubmit={handleResetPassword}>
                  <div className="space-y-4">
                    <div className="space-y-2">
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
                    </div>
                    
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        <p className="text-sm">{error}</p>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full py-6 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl text-base font-medium"
                    >
                      {isLoading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : "Send Reset Instructions"}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="py-4">
                  <div className="p-6 bg-green-50 border border-green-200 rounded-xl mb-6">
                    <div className="flex items-center gap-3 text-green-700 mb-2">
                      <CheckCircle2 className="h-6 w-6" />
                      <h3 className="font-medium">Email sent</h3>
                    </div>
                    <p className="text-sm text-green-700">
                      We've sent password reset instructions to <strong>{email}</strong>. Please check your email inbox and spam folder.
                    </p>
                  </div>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="w-full py-5 h-12 rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-base font-medium"
                  >
                    Try another email
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