import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, ChevronDown, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Custom animation styles
const fadeInAnimation = "transition-all duration-300 ease-in-out opacity-100 transform-none";
const initialHiddenState = "opacity-0 transform translate-y-2";

// Create a range of years for the year dropdown
const currentYear = new Date().getFullYear();
const startYear = 1920;
const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i);

// Country codes data with flags
const countryCodes = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", name: "Nepal", flag: "🇳🇵" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+30", name: "Greece", flag: "🇬🇷" },
  { code: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "+36", name: "Hungary", flag: "🇭🇺" },
  { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { code: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
];

// CountryCodeDropdown component
interface CountryCodeDropdownProps {
  selectedCode: string;
  setSelectedCode: (code: string) => void;
  disabled?: boolean;
}

const CountryCodeDropdown = ({ selectedCode, setSelectedCode, disabled = false }: CountryCodeDropdownProps) => {
  const selectedCountry = countryCodes.find(country => country.code === selectedCode) || countryCodes[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`h-12 px-3 flex items-center justify-center rounded-l-xl rounded-r-none border-r-0 focus:ring-0 focus:ring-offset-0 transition-all duration-300 ${disabled ? 'border-purple-500 bg-purple-50/70 border-r-0' : 'border-gray-200'}`}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{selectedCountry.flag}</span>
            <span className="text-sm font-medium">{selectedCode}</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 max-h-[300px] overflow-y-auto">
        <div className="p-1">
          {countryCodes.map((country) => (
            <div
              key={country.code}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 ${country.code === selectedCode ? "bg-purple-100" : ""
                }`}
              onClick={() => setSelectedCode(country.code)}
            >
              <span className="text-lg">{country.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm">{country.name}</span>
                <span className="text-xs text-gray-500">{country.code}</span>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 4;

  // Step 1: Basic Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default to India
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear - 20);
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationInputs, setVerificationInputs] = useState(["", "", "", ""]);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [phoneVerificationCountdown, setPhoneVerificationCountdown] = useState(0);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const [verificationError, setVerificationError] = useState("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    dob?: string;
    phoneNumber?: string;
    bio?: string;
    institution?: string;
  }>({});

  // Step 2: Profile Information
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bio, setBio] = useState("");

  // Step 3: Education and Work
  const [institution, setInstitution] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [role, setRole] = useState("");
  const [otherRole, setOtherRole] = useState("");

  // Prevent scrolling when selecting role
  const handleRoleSelect = (selectedRole: string) => {
    // Prevent default scrolling behavior
    const currentScrollPosition = window.scrollY;
    setRole(selectedRole);
    // Maintain scroll position
    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 0);
  };

  // Step 4: Preferences and Notifications
  const [interests, setInterests] = useState<string[]>([]);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: true
  });

  const handleNext = () => {
    // Reset previous errors
    setErrors({});

    // Validate required fields based on current step
    if (step === 1) {
      const newErrors: {
        firstName?: string;
        lastName?: string;
        dob?: string;
        phoneNumber?: string;
      } = {};

      if (!firstName.trim()) {
        newErrors.firstName = "First name is required";
      }

      if (!lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }

      if (!dob) {
        newErrors.dob = "Date of birth is required";
      }

      if (!phoneVerified) {
        newErrors.phoneNumber = "Phone verification is required";
      }

      // If there are validation errors, show toast and return
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast({
          title: "Please fill in all required fields",
          description: "All fields marked with * are required to proceed.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      const newErrors: {
        bio?: string;
      } = {};

      if (!bio.trim()) {
        newErrors.bio = "Please tell us about yourself";
      }

      // If there are validation errors, show toast and return
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast({
          title: "Please fill in all required fields",
          description: "All fields marked with * are required to proceed.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 3) {
      const newErrors: {
        institution?: string;
      } = {};

      if (!institution.trim()) {
        newErrors.institution = "Institution is required";
      }

      // If there are validation errors, show toast and return
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast({
          title: "Please fill in all required fields",
          description: "All fields marked with * are required to proceed.",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 4) {
      // Validate that at least 3 interests are selected
      if (interests.length < 3) {
        toast({
          title: "Please select at least 3 interests",
          description: "You need to select a minimum of 3 interests to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    // If validation passes or we're on a different step, proceed
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSkipToDashboard = () => {
    // Redirect to dashboard and scroll to top
    window.scrollTo(0, 0);
    navigate("/dashboard");
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Here you would typically send the onboarding data to your backend
    // Data would include: firstName, lastName, dob, phoneNumber, countryCode, 
    // profilePicture, bio, institution, fieldOfStudy, role, interests, notifications

    // For demo, just simulate a loading state
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard and scroll to top
      window.scrollTo(0, 0);
      navigate("/dashboard");
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const newDate = new Date(calendarMonth);
    newDate.setFullYear(year);
    setCalendarMonth(newDate);
  };

  const selectCountryCode = (code: string) => {
    setCountryCode(code);
    setShowCountrySelector(false);
  };

  const getCountryByCode = (code: string) => {
    return countryCodes.find(country => country.code === code) || countryCodes[0];
  };

  // Handle verification code input with proper types
  const handleVerificationInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newInputs = [...verificationInputs];
    newInputs[index] = value;
    setVerificationInputs(newInputs);
    setVerificationCode(newInputs.join(""));

    // Auto focus to next input
    if (value !== "" && index < 3) {
      const nextInput = document.getElementById(`phone-verification-${index + 1}`) as HTMLInputElement | null;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle backspace to go to previous verification input with proper types
  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0 && verificationInputs[index] === "") {
      const prevInput = document.getElementById(`phone-verification-${index - 1}`) as HTMLInputElement | null;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Send verification code to phone
  const handleSendVerificationCode = () => {
    // Clear any previous verification error
    setVerificationError("");

    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 6) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    setShowVerificationInput(true);

    // Reset verification inputs if resending
    setVerificationInputs(["", "", "", ""]);
    setVerificationCode("");

    // Here you would call an API to send verification code
    // For demo, just simulate sending

    setTimeout(() => {
      setIsVerifying(false);
      setPhoneVerificationCountdown(30); // Reduced to 30 seconds for better UX

      // Start countdown
      const interval = setInterval(() => {
        setPhoneVerificationCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      toast({
        title: "Verification code sent",
        description: `A 4-digit code has been sent to ${countryCode} ${phoneNumber}`,
      });
    }, 1000);
  };

  const handleVerifyPhone = () => {
    // Clear any previous verification error
    setVerificationError("");

    if (verificationCode.length !== 4) {
      setVerificationError("Please enter the complete 4-digit code");
      return;
    }

    setIsVerifying(true);

    // Here you would call an API to verify the code
    // For demo purposes, we'll use "1234" as the valid code

    setTimeout(() => {
      setIsVerifying(false);

      // For demo, check if code is "1234"
      if (verificationCode === "1234") {
        setPhoneVerified(true);
        setShowVerificationInput(false);

        toast({
          title: "Phone verified",
          description: "Your phone number has been verified successfully",
        });
      } else {
        // Increment attempt counter
        const newAttempts = verificationAttempts + 1;
        setVerificationAttempts(newAttempts);

        // Show error message
        setVerificationError("Invalid code. Please try again.");

        // Reset verification inputs
        setVerificationInputs(["", "", "", ""]);
        setVerificationCode("");

        // Focus on first input
        setTimeout(() => {
          const firstInput = document.getElementById("phone-verification-0") as HTMLInputElement | null;
          if (firstInput) {
            firstInput.focus();
          }
        }, 100);

        // If too many attempts, lock verification
        if (newAttempts >= 3) {
          setVerificationError("Too many failed attempts. Please try again later.");
          setPhoneVerificationCountdown(60);

          // Start countdown
          const interval = setInterval(() => {
            setPhoneVerificationCountdown(prev => {
              if (prev <= 1) {
                clearInterval(interval);
                setVerificationAttempts(0);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white overflow-hidden">
      <div className="max-w-2xl w-full px-4 sm:px-6 overflow-y-auto max-h-screen py-4 sm:py-6">
        <div className="w-full">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm rounded-2xl">
            <CardHeader className="space-y-1 text-center pb-4 sm:pb-6">
              <div className="flex justify-center mb-2">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Complete your profile</CardTitle>
              <CardDescription className="text-gray-500">
              </CardDescription>

              <div className="border-t border-gray-200 my-6 sm:my-8 pt-6 sm:pt-8 w-full">
                <div className="relative">
                  <Progress value={(step / totalSteps) * 100} className="h-3 bg-gray-100 rounded-full overflow-hidden" />
                  <div className="absolute top-0 left-0 h-3 w-full bg-transparent">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                    ></div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex justify-between px-0">
                    {Array.from({ length: totalSteps }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full -mt-1.5 flex items-center justify-center transition-all duration-300 ${step > index
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                          : step === index + 1
                            ? "border-2 border-purple-600 bg-white"
                            : "border-2 border-gray-200 bg-white"
                          }`}
                      >
                        {step > index ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-[10px] text-gray-500 font-medium">{index + 1}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-3 text-sm text-gray-500">
                  <span className={`${step >= 1 ? "text-purple-600 font-medium" : ""}`}>Basic Info</span>
                  <span className={`${step >= 2 ? "text-purple-600 font-medium" : ""}`}>Profile</span>
                  <span className={`${step >= 3 ? "text-purple-600 font-medium" : ""}`}>Education</span>
                  <span className={`${step >= 4 ? "text-purple-600 font-medium" : ""}`}>Preferences</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {step === 1 && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="firstName" className="flex items-center text-sm sm:text-base">
                        First Name <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className={`h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl ${errors.firstName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="lastName" className="flex items-center text-sm sm:text-base">
                        Last Name <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className={`h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl ${errors.lastName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="dob" className="flex items-center text-sm sm:text-base">
                      Date of Birth <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl text-left font-normal justify-start",
                            !dob && "text-muted-foreground",
                            errors.dob && "border-red-500 focus:ring-red-500"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dob ? format(dob, "PPP") : <span>Select your date of birth</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="p-3 border-b">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="year-select" className="text-sm font-medium">Year:</Label>
                            <Select
                              value={selectedYear.toString()}
                              onValueChange={(value) => handleYearChange(parseInt(value))}
                            >
                              <SelectTrigger id="year-select" className="w-[120px] h-8">
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                              <SelectContent className="max-h-60">
                                {years.map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Calendar
                          mode="single"
                          selected={dob}
                          onSelect={setDob}
                          month={calendarMonth}
                          onMonthChange={setCalendarMonth}
                          initialFocus
                          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.dob && (
                      <p className="text-red-500 text-xs flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.dob}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="phoneNumber" className="flex items-center text-sm sm:text-base">
                      Phone Number <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div className="flex items-center gap-0 relative">
                      <div className="flex rounded-lg border border-gray-200 w-full">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="flex items-center px-2 sm:px-3 h-10 border-r border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <span className="text-base sm:text-lg">{getCountryByCode(countryCode)?.flag || "🇮🇳"}</span>
                                <span className="text-xs sm:text-sm font-medium">{countryCode}</span>
                                <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 opacity-70" />
                              </div>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0 max-h-[300px] overflow-y-auto">
                            <div className="p-1">
                              {countryCodes.map((country) => (
                                <div
                                  key={country.code}
                                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 ${country.code === countryCode ? "bg-purple-100" : ""
                                    }`}
                                  onClick={() => setCountryCode(country.code)}
                                >
                                  <span className="text-lg">{country.flag}</span>
                                  <div className="flex flex-col">
                                    <span className="text-sm">{country.name}</span>
                                    <span className="text-xs text-gray-500">{country.code}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                        <Input
                          type="tel"
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={`border-0 h-10 flex-1 z-10 relative text-sm sm:text-base ${errors.phoneNumber ? 'focus:ring-red-500' : ''}`}
                          disabled={phoneVerified}
                          placeholder="Enter phone number"
                        />
                      </div>
                      {!phoneVerified && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSendVerificationCode}
                          disabled={!phoneNumber || phoneNumber.length < 6 || isLoading || phoneVerificationCountdown > 0}
                          className="ml-2 h-10 px-2 sm:px-3 rounded-lg text-xs"
                        >
                          {phoneVerificationCountdown > 0 ? `${phoneVerificationCountdown}s` : "Verify"}
                        </Button>
                      )}
                    </div>

                    {errors.phoneNumber && (
                      <p className="text-red-500 text-xs flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.phoneNumber}
                      </p>
                    )}
                    {showVerificationInput && !phoneVerified && (
                      <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-purple-100 flex items-center justify-center mr-1">
                              <span className="text-purple-600 text-[10px] font-medium">✓</span>
                            </div>
                            <p className="text-xs font-medium text-gray-700 truncate">Code sent to {phoneNumber}</p>
                          </div>
                          <Button
                            type="button"
                            variant="link"
                            onClick={handleSendVerificationCode}
                            disabled={phoneVerificationCountdown > 0 || isVerifying}
                            className="p-0 h-auto text-purple-600 text-xs"
                          >
                            {phoneVerificationCountdown > 0 ? null : "Resend"}
                          </Button>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-2">
                          <div className="flex gap-1 flex-1">
                            {verificationInputs.map((input, index) => (
                              <Input
                                key={index}
                                type="text"
                                id={`phone-verification-${index}`}
                                value={input}
                                onChange={(e) => handleVerificationInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                                className={`w-8 sm:w-9 h-9 text-center text-sm sm:text-base font-semibold rounded-md border ${verificationError ? 'border-red-500' : ''} focus:border-purple-500 focus:ring-purple-200 focus:ring-1 transition-all duration-200 p-0`}
                                maxLength={1}
                                disabled={isVerifying || phoneVerificationCountdown === 0 && verificationAttempts >= 3}
                              />
                            ))}
                          </div>
                          <Button
                            type="button"
                            onClick={handleVerifyPhone}
                            disabled={isVerifying || verificationCode.length !== 4 || (phoneVerificationCountdown === 0 && verificationAttempts >= 3)}
                            className="h-9 px-2 sm:px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-md transition-all duration-300 text-xs"
                          >
                            {isVerifying ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              "Verify"
                            )}
                          </Button>
                        </div>

                        {verificationError && (
                          <p className="text-red-500 text-xs flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {verificationError}
                          </p>
                        )}

                        {phoneVerificationCountdown > 0 && verificationAttempts >= 3 && (
                          <p className="text-xs text-center text-gray-500 mt-1">
                            Try again in {phoneVerificationCountdown}s
                          </p>
                        )}
                      </div>
                    )}

                    {phoneVerified && (
                      <div className="mt-1 flex items-center text-green-600 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      {profilePicture ? (
                        <img
                          src={URL.createObjectURL(profilePicture)}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="photo" className="cursor-pointer inline-block px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                        Upload profile picture
                      </Label>
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="flex items-center">
                      Tell us about yourself <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us a bit about yourself..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className={`min-h-[100px] rounded-xl ${errors.bio ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.bio ? (
                      <p className="text-red-500 text-xs flex items-center mt-1">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        {errors.bio}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">Maximum 200 characters</p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <Label htmlFor="institution" className="flex items-center mb-1 sm:mb-2 text-sm sm:text-base">
                        Institution <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="institution"
                        placeholder="Enter your school, college, or company name"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        required
                        className={`h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl ${errors.institution ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {errors.institution && (
                        <p className="text-red-500 text-xs flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {errors.institution}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="fieldOfStudy" className="mb-1 sm:mb-2 block text-sm sm:text-base">Field of Study</Label>
                      <Input
                        id="fieldOfStudy"
                        placeholder="E.g. Computer Science, Design, Mathematics"
                        value={fieldOfStudy}
                        onChange={(e) => setFieldOfStudy(e.target.value)}
                        className="h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="h-6 sm:h-8 w-1 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
                        <Label className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">What best describes your role?</Label>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 mb-2">
                        {["Student", "Entrepreneur", "Developer", "Designer", "Marketer", "Other"].map((roleOption) => {
                          const isSelected = role === roleOption.toLowerCase();
                          return (
                            <Button
                              key={roleOption}
                              type="button"
                              variant={isSelected ? "default" : "outline"}
                              onClick={(e) => {
                                e.preventDefault();
                                handleRoleSelect(roleOption.toLowerCase());
                              }}
                              className={`
                                relative overflow-hidden group transition-all duration-300 
                                rounded-xl sm:rounded-2xl h-auto py-2 sm:py-3 px-2 sm:px-4 z-10 text-xs sm:text-sm
                                ${isSelected
                                  ? "bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 border-0"
                                  : "border border-indigo-100"}
                              `}
                            >
                              <span className={`
                                relative z-10 font-medium
                                ${isSelected ? "text-white" : "text-gray-700"}
                              `}>
                                {roleOption}
                              </span>
                            </Button>
                          );
                        })}
                      </div>

                      {role === "other" && (
                        <div className="mt-3">
                          <Input
                            placeholder="Please specify your role"
                            value={otherRole}
                            onChange={(e) => setOtherRole(e.target.value)}
                            className="h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-indigo-100 focus:border-purple-300 focus:ring-purple-200"
                            autoFocus
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-8 sm:h-10 w-1 sm:w-1.5 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full shadow-sm"></div>
                        <Label className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">What are you interested in?</Label>
                      </div>
                      <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full shadow-sm border border-indigo-100 self-start sm:self-auto">
                        <div className={`text-xs sm:text-sm font-medium ${interests.length >= 3 ? 'text-emerald-600' : 'text-indigo-500'} transition-colors duration-300`}>
                          {interests.length}/3 selected
                        </div>
                        {interests.length >= 3 ? (
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                        ) : (
                          <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-dashed border-indigo-300 animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 relative">
                      {/* Simple decorative elements */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-300/10 rounded-full blur-3xl z-0 hidden sm:block"></div>
                      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl z-0 hidden sm:block"></div>

                      {["Technology", "Startup", "Graphic Design", "UI/UX", "Editing", "Content Writing", "Game Development", "Marketing", "Animation"].map((interest) => {
                        const isSelected = interests.includes(interest);
                        return (
                          <Button
                            key={interest}
                            type="button"
                            variant={isSelected ? "default" : "outline"}
                            onClick={() => handleInterestToggle(interest)}
                            className={`
                              relative overflow-hidden group transition-all duration-300 
                              rounded-xl sm:rounded-2xl h-auto py-3 sm:py-5 px-2 sm:px-4 z-10 text-xs sm:text-sm
                              ${isSelected
                                ? "bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 border-0"
                                : "border border-indigo-100"}
                            `}
                          >
                            {/* Subtle hover effect element */}
                            <div className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-xl sm:rounded-2xl"></div>

                            <span className={`
                              relative z-10 font-medium
                              ${isSelected ? "text-white" : "text-gray-700"}
                              group-hover:${isSelected ? "text-white" : "text-indigo-700"}
                              transition-all duration-300 group-hover:font-semibold
                            `}>
                              {interest}
                            </span>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between p-4 sm:p-6">
              <Button
                variant="outline"
                onClick={step === 2 ? handleSkipToDashboard : handleBack}
                disabled={step === 1}
                className={`rounded-xl h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base border-2 ${step === 1 ? 'opacity-50' : ''}`}
              >
                {step === 2 ? "Skip" : "Back"}
              </Button>
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="rounded-xl h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 relative overflow-hidden group shadow-lg hover:shadow-purple-200/50 transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <span>{step === totalSteps ? "Finish" : "Next"}</span>
                      {!isLoading && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                      )}
                    </>
                  )}
                </span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
