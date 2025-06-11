import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IntrestType } from "@/reducers/Intrests";
import { RootState } from "@/store";
import { AnimatePresence, motion } from "framer-motion";
import {
  BellIcon as Bell,
  BookOpenIcon as BookOpen,
  CalendarIcon as Calendar,
  Camera,
  Edit as EditIcon,
  Github,
  Globe,
  Heart,
  HomeIcon as Home,
  Linkedin,
  LogOut,
  Mail,
  Pencil,
  Save as SaveIcon,
  UserIcon as User,
  UsersIcon as Users,
  X
} from 'lucide-react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { CountryType, StateType, useCountries } from "@/Api/External/useContries";
import { useProfile } from "@/Api/Profile";
import { ConfirmLogoutModal } from "@/components/Modals/Auth/LogoutConfirm";
import { Input } from "@/components/ui/input";
import { useCallProfileInfo } from "@/hooks/Profile";
import { UserResponse } from "@/reducers/me";
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { DatePicker, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import defaultProfle from "../Icons/defaultprofile.svg";
import { ProfilePictureModal } from "@/components/Modals/ProfilePicture";
import { MainNav } from "./MainNav";
import { MainSlider } from "./MainSlider";

const Option = Select.Option;

// StatCard component for profile statistics
interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}

// NavItem component for sidebar
interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}

const NavItem = ({ icon, text, active, badge, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ease-in-out group relative overflow-hidden ${active
      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-[1.01]'
      : 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50/80 text-indigo-800 hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.005]'
      }`}
  >
    {/* Background glow effect */}
    {!active && (
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-indigo-400/0 to-purple-400/0 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 ease-in-out"></div>
    )}
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-indigo-400/20 opacity-30 blur-md"></div>
    )}

    <div className={`relative z-10 ${active ? 'text-white' : 'text-indigo-600'} transition-all duration-200 ease-in-out ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    <span className="relative z-10 text-base font-medium tracking-tight group-hover:translate-x-0.5 transition-all duration-200 ease-in-out">{text}</span>
    {badge && (
      <div className="relative z-10 ml-auto bg-white/90 backdrop-blur-sm text-indigo-600 min-w-6 h-6 px-1.5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm border border-indigo-100/50 transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-md group-hover:border-indigo-200/70 group-hover:bg-white">
        {badge}
      </div>
    )}
  </button>
);

export default function UserProfile() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { updateIntrest, isLoading, deleteIntrest, updateBio, updateNames, updateSocialLinks, onboardingFirstStep, updateEducation, updateAddress } = useProfile();
  const { getMeByToken } = useCallProfileInfo();
  const { getCountries, isLoading: isCountriesLoading, getStates, getCities } = useCountries();

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.userSlice.user);
  const intrests = userInfo?.intrests;
  const isValidIntrests = userInfo?.intrests && userInfo?.intrests.length > 0;
  const [selectedIntrests, setSelectedIntrests] = useState<IntrestType[] | null>();

  const isAdmin = userInfo && userInfo.userType ? userInfo.userType === "admin" || userInfo.userType === "superadmin" : false;
  const isUpdateIntrest = intrests && intrests.length > 0;

  const userIntrest = useSelector((state: RootState) => state.intrestSlice.intrests);
  const [validIntrests, setValidIntrests] = useState<IntrestType[] | undefined>(
    userIntrest?.filter((intrest) => (isValidIntrests ? !intrests.some(userIntrest => userIntrest === intrest?.id) : true) && (selectedIntrests ? !selectedIntrests?.some((userIntrest) => userIntrest.id === intrest?.id) : true))
  );
  const showMyIntrests = userIntrest?.filter((intrest) => isValidIntrests ? intrests?.includes(intrest.id) : false);

  const [about, setAbout] = useState<string>(userInfo?.about || "");
  const [isOpenAboutEdit, setIsOpenAboutEdit] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<Partial<UserResponse["user"]>>({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    username: userInfo?.username || "",
    email: userInfo?.email || "",
    linkedinLink: userInfo?.linkedinLink || "",
    githubLink: userInfo?.githubLink || "",
    portfolioLink: userInfo?.portfolioLink || "",
    dob: userInfo?.dob || "",
    phone: userInfo?.phone || "",
    fieldDescription: userInfo?.fieldDescription || "",
    fieldOfStudy: userInfo?.fieldOfStudy || "",
    institution: userInfo?.institution || "",
    country: userInfo?.country || "",
    zinPinCode: userInfo?.zinPinCode || "",
    state: userInfo?.state || "",
    city: userInfo?.city || "",
  });

  const [isEditSocial, setIsEditSocial] = useState<boolean>(false);
  const [isEditOneOnBoarding, setIsEditOpenOneBoarding] = useState<boolean>(false);
  const [isEditEducation, setIsEditEducation] = useState<boolean>(false);
  const [openLogout, setOpenLogout] = useState<boolean>(false);
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);

  // const { countries, states } = useSelector((state: RootState) => state.countries);

  const [activeCountries, setActiveCountries] = useState<CountryType[]>([]);
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [states, setStates] = useState<StateType[]>([]);
  const [activeStates, setActiveStates] = useState<StateType[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [activeCities, setActiveCities] = useState<string[]>([]);
  const [openProfilePictureModal, setOpenProfilePictureModal] = useState<boolean>(false);

  // const dispatch = useDispatch();

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Save profile changes
  const saveProfile = () => {
    // In a real app, you would send the updated data to an API
    setEditMode(false);
    // Show success message or notification
  };

  const handleAddSelectIntrest = (intrest: IntrestType) => {
    if (selectedIntrests?.some((item) => item.id === intrest.id)) {
      return;
    }
    if (selectedIntrests) {
      setSelectedIntrests([...selectedIntrests, intrest]);
    } else {
      setSelectedIntrests([intrest]);
    }
  }

  const updateShowIntrests = () => {
    setValidIntrests(
      userIntrest?.filter((intrest) => (isValidIntrests ? !intrests.some(userIntrest => userIntrest === intrest?.id) : true) && (selectedIntrests ? !selectedIntrests?.some((userIntrest) => userIntrest.id === intrest?.id) : true))
    );
  }

  const handleRemoveSelectIntrest = (id: string) => {
    if (selectedIntrests) {
      const updatedIntrests = selectedIntrests.filter((item) => item.id !== id);
      setSelectedIntrests(updatedIntrests);
    }
  }
  const handleUpdateIntrest = async () => {
    await updateIntrest(selectedIntrests);
    getMeByToken();
    updateShowIntrests();
    setIsEditOpen(false);
    setSelectedIntrests(null)
  }

  const hnadleDeleteIntrest = async (id: string) => {
    await deleteIntrest(id);
    getMeByToken();
    updateShowIntrests();
    setIsEditOpen(false);
    setSelectedIntrests(null)
  }

  const updateBioInfo = async () => {
    await updateBio(about);
    getMeByToken();
    setIsOpenAboutEdit(false);
  }

  const updateNamesByToken = async () => {
    const res = await updateNames({
      firstName: profileInfo.firstName,
      lastName: profileInfo.lastName,
    });
    if (res?.success) {
      getMeByToken();
      setEditMode(false);
    }
  }

  const handleSetProfileInfor = (type: string, value: string) => {
    setProfileInfo((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const updateSocialLinksByToken = async () => {
    const res = await updateSocialLinks({
      linkedinLink: profileInfo?.linkedinLink,
      githubLink: profileInfo?.githubLink,
      portfolioLink: profileInfo?.portfolioLink,
    });
    if (res?.success) {
      getMeByToken();
      setIsEditSocial(false);
    }
  }

  const onboardingFirstStepByToken = async () => {
    const res = await onboardingFirstStep({
      firstName: profileInfo.firstName,
      lastName: profileInfo.lastName,
      dob: dayjs(profileInfo.dob).format("YYYY-MM-DD"),
      phone: profileInfo.phone,
    });
    if (res?.success) {
      getMeByToken();
      setIsEditOpenOneBoarding(false);
    }
  }

  const updateEducationByToken = async () => {
    const res = await updateEducation({
      fieldOfStudy: profileInfo.fieldOfStudy,
      fieldDescription: profileInfo.fieldDescription,
      institution: profileInfo.institution,
    });
    if (res?.success) {
      getMeByToken();
      setIsEditEducation(false);
    }
  }

  const getCountriesList = async () => {
    const res = await getCountries();
    setActiveCountries(res || []);
    setCountries(res || []);
  }

  const updateountry = async (val: string) => {
    const res = await getStates(val);
    setStates(res || []);
    setActiveStates(res || []);
    handleSetProfileInfor("country", val);
    handleSetProfileInfor("state", "");
    handleSetProfileInfor("city", "");
  }

  const handleCountriesSearch = (value: string) => {
    if (value) {
      const val = countries.filter((country) =>
        country.country.toLowerCase().includes(value.toLowerCase())
      );
      setActiveCountries(val || []);
    }
    setActiveCountries(countries || []);
  }

  const handleStatesSearch = (value: string) => {
    if (value) {
      const val = states.filter((state) =>
        state.name.toLowerCase().includes(value.toLowerCase())
      );
      setActiveStates(val || []);
    }
    setActiveStates(states || []);
  }

  const handleCitiesSearch = (value: string) => {
    if (value) {
      const val = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setActiveCities(val || []);
    }
    setActiveCities(cities || []);
  }

  const updateState = async (val: string) => {
    const res = await getCities(profileInfo.country || "", val || profileInfo.state || "");
    handleSetProfileInfor("state", val);
    handleSetProfileInfor("city", "");
    setCities(res || []);
    setActiveCities(res || []);
  }

  const updateAddressByToken = async () => {
    const res = await updateAddress({
      country: profileInfo.country,
      state: profileInfo.state,
      city: profileInfo.city,
      zinPinCode: profileInfo.zinPinCode,
      address: profileInfo.address,
    });
    if (res?.success) {
      getMeByToken();
      setIsEditAddress(false);
    }
  }

  const handleEditOpenCountries = async () => {
    setIsEditAddress(true);
    await getCountriesList();
    if (userInfo?.country) {
      updateountry(userInfo?.country);
      if (userInfo?.state) {
        updateState(userInfo?.state);
      }
    }
  }

  useEffect(() => {
    setProfileInfo({
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName || "",
      username: userInfo?.username || "",
      email: userInfo?.email || "",
      linkedinLink: userInfo?.linkedinLink || "",
      githubLink: userInfo?.githubLink || "",
      portfolioLink: userInfo?.portfolioLink || "",
      dob: userInfo?.dob || "",
      phone: userInfo?.phone || "",
      fieldOfStudy: userInfo?.fieldOfStudy || "",
      fieldDescription: userInfo?.fieldDescription || "",
      institution: userInfo?.institution || "",
      country: userInfo?.country || "",
      zinPinCode: userInfo?.zinPinCode || "",
      state: userInfo?.state || "",
      city: userInfo?.city || "",
    })
  }, [userInfo]);

  useEffect(() => {
    updateShowIntrests();
  }, [userIntrest, isValidIntrests, selectedIntrests, intrests]);

  return (
    <div className="min-h-screen bg-transparent text-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background gradient elements - Applied to entire page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-[500px] w-[500px] -top-40 -right-40 bg-purple-300/30 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute h-[600px] w-[600px] bottom-20 -left-60 bg-indigo-300/30 rounded-full blur-[100px] animate-pulse-slow opacity-70"></div>
        <div className="absolute h-[300px] w-[300px] top-1/2 right-20 bg-purple-400/20 rounded-full blur-[80px] animate-pulse-slow opacity-80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:20px_20px] opacity-[0.03]"></div>
      </div>

      {/* Modern Header with Glass Effect */}
      {/* Sidebar */}
      <MainSlider />

      {/* Header - Modern User-Friendly Design */}
      <MainNav type="user-profile" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-gray-200 border-b shadow-lg md:hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {['Dashboard', 'Events', 'Sessions', 'Community'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    navigate(`/${item.toLowerCase()}`);
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-purple-100 text-gray-700 hover:text-purple-700"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="pt-24 pb-12 relative z-10">
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-12">
              {/* Profile Image with Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative rounded-full p-1 bg-white shadow-xl">
                  <div className="relative group overflow-hidden rounded-full">
                    <Avatar
                      onClick={() => setOpenProfilePictureModal(true)}
                      className="cursor-pointer h-32 w-32 md:h-40 md:w-40 border-4 border-white"
                    >
                      <AvatarImage
                        src={userInfo?.profileImage || defaultProfle}
                        alt="User"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-3xl md:text-4xl">JD</AvatarFallback>
                    </Avatar>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-opacity"
                      onClick={() => setOpenProfilePictureModal(true)}
                    >
                      <Camera className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Online Status Indicator */}
                <div className="absolute bottom-3 right-3 h-4 w-4 md:h-5 md:w-5 rounded-full bg-green-500 border-4 border-white"></div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 text-center lg:text-left"
              >
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 md:gap-6">
                  {!editMode ? <div>
                    <div className="flex gap-3 w-fit"><h1 className="text-2xl md:text-4xl font-bold text-indigo-900 mb-2">{profileInfo?.firstName}</h1><h1 className="text-2xl md:text-4xl font-bold text-indigo-900 mb-2">{profileInfo?.lastName}</h1></div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 sm:gap-4">
                      <p className="text-base md:text-lg font-medium text-indigo-700">@{profileInfo?.username || ""}</p>
                      {/* <p className="px-3 py-1 rounded-full text-xs md:text-sm bg-indigo-100 text-indigo-600">{userInfo.role}</p> */}
                    </div>
                  </div> : <div className=" flex gap-2 flex-col">
                    <div className="flex gap-10">
                      <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">First Name</label>
                        <input onChange={(e) => handleSetProfileInfor("firstName", e.target.value)} value={profileInfo?.firstName || ""} placeholder="Enter your First Name" className="w-64 h-8 px-1" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Last Name</label>
                        <input onChange={(e) => handleSetProfileInfor("lastName", e.target.value)} value={profileInfo?.lastName || ""} placeholder="Enter your Last Name" className="w-64 h-8 px-1" />
                      </div>
                    </div>
                  </div>}

                  {/* Action Buttons - Hidden on mobile, shown on desktop */}
                  <div className="hidden lg:flex gap-3 justify-center lg:justify-end">
                    {editMode ? (
                      <>
                        <Button
                          variant="outline"
                          className="rounded-full bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                          onClick={toggleEditMode}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Cancel
                        </Button>
                        <Button
                          className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                          onClick={updateNamesByToken}
                          isLoading={isLoading.updateNames}
                        >
                          <SaveIcon className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        onClick={toggleEditMode}
                      >
                        <EditIcon className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>

                {/* Contact Info Badges */}
                <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
                  <Badge variant="outline" className="bg-white/80 text-indigo-700 border-indigo-200 px-2 md:px-3 py-1 md:py-1.5 flex items-center gap-1 md:gap-2 rounded-full text-xs md:text-sm">
                    <Mail className="h-3 w-3 md:h-4 md:w-4" />
                    {profileInfo?.email}
                  </Badge>
                </div>

                {/* Action Buttons - Mobile only */}
                <div className="flex lg:hidden gap-3 justify-center mt-4">
                  {editMode ? (
                    <>
                      <Button
                        variant="outline"
                        className="rounded-full bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs px-3 py-1"
                        onClick={toggleEditMode}
                      >
                        <X className="mr-1 h-3 w-3" />
                        Cancel
                      </Button>
                      <Button
                        className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs px-3 py-1"
                        onClick={saveProfile}
                      >
                        <SaveIcon className="mr-1 h-3 w-3" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs px-3 py-1.5"
                      onClick={toggleEditMode}
                    >
                      <EditIcon className="mr-1 h-3 w-3" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 md:mb-12"
          >
            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
              <div className="p-4 md:p-8">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                    <User className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                  </div>
                  <div className=" flex w-full items-center justify-between"><h2 className="text-lg md:text-xl font-bold text-indigo-800">About</h2><div onClick={() => setIsOpenAboutEdit(true)} className="w-fit flex justify-center items-center gap-3 cursor-pointer hover:shadow-lg px-3 py-1.5 rounded"><Pencil size={15} /><div>Edit</div></div></div>
                </div>

                {isOpenAboutEdit ? (
                  <div>
                    <Textarea
                      value={about || userInfo?.about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="w-full min-h-[120px] rounded-xl bg-white border-indigo-200 text-gray-700"
                      placeholder="Write something about yourself..."
                    />
                    <div className="mt-2 w-full flex justify-end items-center gap-2.5">
                      <Button onClick={() => setIsOpenAboutEdit(false)} variant="outline">Cancel</Button>
                      <Button onClick={updateBioInfo} isLoading={isLoading?.updateBio}>Save</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed text-gray-700 line-clamp-4">{userInfo?.about}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Interests Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 md:mb-12"
          >
            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
              <div className="p-4 md:p-8">
                <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                    <Heart className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
                  </div>
                  <div className="w-full t-gap-2 flex justify-between px-3 items-center"><h2 className="text-lg md:text-xl font-bold text-indigo-800">Interests</h2>
                    <div className="w-fit flex gap-10">
                      {!isEditOpen && <div onClick={() => setIsEditOpen(true)} className="w-fit flex justify-center items-center gap-3 cursor-pointer hover:shadow-lg px-3 py-1.5 rounded"><Pencil size={15} />{isUpdateIntrest ? "Update" : "Edit"}</div>}
                    </div>
                  </div>
                </div>
                {selectedIntrests?.length > 0 && <div className="flex flex-wrap gap-2 md:gap-3 mb-4">{
                  selectedIntrests?.map((intrest) => (<Tooltip key={intrest.id}>
                    <TooltipTrigger asChild><div onClick={() => handleRemoveSelectIntrest(intrest?.id)} className="text-sm rounded-lg w-fit h-fit px-2.5 py-1.5 bg-indigo-100 text-purple-500 font-semibold flex gap-2 items-center cursor-pointer">{intrest.name}<X className="h-3 w-3" /></div></TooltipTrigger>
                    <TooltipContent side="right" className="bg-black p-3 text-white ml-2 rounded-lg">
                      {intrest.description}
                    </TooltipContent>
                  </Tooltip>
                  ))}</div>}
                {isEditOpen && <div className="flex flex-wrap w-full gap-2 md:gap-3 mb-4">
                  {validIntrests?.map((intrest) => (

                    <div
                      onClick={() => handleAddSelectIntrest(intrest)}
                      className="w-fit h-fit p-2 px-3.5 rounded-md bg-purple-200 text-purple-700 font-mono text-lg cursor-pointer line-clamp-1 truncate"
                      key={intrest.id}
                    >
                      {intrest.name}
                    </div>
                  ))}
                </div>}
                {isUpdateIntrest && <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-purple-200 shadow-sm">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {showMyIntrests.map((interest, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative w-fit px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-purple-50/70 hover:bg-purple-100 backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-purple-700">{interest?.name}</span>
                          {isEditOpen && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                              onClick={() => hnadleDeleteIntrest(interest?.id)}
                              className="h-5 w-5 ml-1 rounded-full flex items-center justify-center bg-white text-gray-500 hover:bg-red-100 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>}
                {isEditOpen && <div className="w-full flex justify-end py-2 p-x1 gap-3"><Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button><Button onClick={handleUpdateIntrest} isLoading={isLoading.intrestupdate || isLoading.intrestDelete}>Save</Button></div>}
              </div>
            </div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 md:mb-12"
          >

            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
              <div className="p-4 md:p-8">
                <div className="flex items-center justify-between gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                      <Link className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" to={""} />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-indigo-800">Social Links</h2>
                  </div>
                  {!isEditSocial && <div onClick={() => setIsEditSocial(true)} className="w-fit flex justify-center items-center gap-3 cursor-pointer hover:shadow-lg px-3 py-1.5 rounded"><Pencil size={15} />Edit</div>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditSocial ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                      <Globe className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    {isEditSocial ? (
                      <Input
                        value={profileInfo?.portfolioLink}
                        onChange={(e) => handleSetProfileInfor('portfolioLink', e.target.value)}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="Portfolio URL"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Portfolio</p>
                        <a className="block max-w-xs" target="_blank" href={userInfo?.portfolioLink || ""}>
                          <p className="overflow-hidden text-sm md:text-base font-medium text-indigo-700">{userInfo?.portfolioLink}</p>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditSocial ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                      <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    {isEditSocial ? (
                      <Input
                        value={profileInfo?.linkedinLink}
                        onChange={(e) => handleSetProfileInfor('linkedinLink', e.target.value)}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="LinkedIn Username"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">LinkedIn</p>
                        <a className="block max-w-xs" target="_blank" href={userInfo?.linkedinLink || ""}>
                          <p className="overflow-hidden text-sm md:text-base font-medium text-indigo-700">{userInfo?.linkedinLink}</p>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditSocial ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    <div className="p-2 rounded-full bg-indigo-100 text-indigo-600">
                      <Github className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    {isEditSocial ? (
                      <Input
                        value={profileInfo?.githubLink}
                        onChange={(e) => handleSetProfileInfor('githubLink', e.target.value)}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="GitHub Username"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">GitHub</p>
                        <a className="block max-w-xs" target="_blank" href={userInfo?.githubLink || ""}>
                          <p className="overflow-hidden text-sm md:text-base font-medium text-indigo-700">{userInfo?.githubLink}</p>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                {isEditSocial && <div className="w-full flex justify-end py-2 p-x1 gap-3"><Button variant="outline" onClick={() => setIsEditSocial(false)}>Cancel</Button><Button onClick={updateSocialLinksByToken} isLoading={isLoading.updateSocialLinks}>Save</Button></div>}
              </div>
            </div>
          </motion.div>

          {/* Onboarding step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 md:mb-12"
          >

            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
              <div className="p-4 md:p-8">
                <div className="flex items-center justify-between gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                      <Link className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" to={""} />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-indigo-800">Personal Information</h2>
                  </div>
                  {!isEditOneOnBoarding && <div onClick={() => setIsEditOpenOneBoarding(true)} className="w-fit flex justify-center items-center gap-3 cursor-pointer hover:shadow-lg px-3 py-1.5 rounded"><Pencil size={15} />Edit</div>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditOneOnBoarding ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditOneOnBoarding ? (
                      <Input
                        value={profileInfo?.firstName}
                        onChange={(e) => handleSetProfileInfor('firstName', e.target.value)}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="First Name"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">First Name</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{userInfo?.firstName}</p>
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditOneOnBoarding ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditOneOnBoarding ? (
                      <Input
                        value={profileInfo?.lastName}
                        onChange={(e) => handleSetProfileInfor('lastName', e.target.value)}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="Last Name"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{userInfo?.lastName}</p>
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditOneOnBoarding ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditOneOnBoarding ? (
                      <DatePicker
                        format="MMM DD, YYYY"
                        className="w-full"
                        placeholder="Date of Birth"
                        disabledDate={(current) => current && current.isAfter(dayjs())}
                        value={dayjs(profileInfo?.dob)}
                        onChange={(date => handleSetProfileInfor('dob', date?.format('YYYY-MM-DD')))}
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{dayjs(userInfo?.dob).format("MMM DD, YYYY")}</p>
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditOneOnBoarding ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditOneOnBoarding ? (
                      <InputNumber
                        className="w-full"
                        placeholder="Phone Number"
                        min={5000000000}
                        max={9999999999}
                        value={Number(profileInfo?.phone)}
                        onChange={(value) => handleSetProfileInfor('phone', String(value))}
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Phone no</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{userInfo?.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
                {isEditOneOnBoarding && <div className="w-full flex justify-end py-2 p-x1 gap-3"><Button variant="outline" onClick={() => setIsEditOpenOneBoarding(false)}>Cancel</Button><Button onClick={onboardingFirstStepByToken} isLoading={isLoading.onboardingFirstStep}>Save</Button></div>}
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 md:mb-12"
          >

            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
              <div className="p-4 md:p-8">
                <div className="flex items-center justify-between gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                      <Link className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" to={""} />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-indigo-800">Education</h2>
                  </div>
                  {!isEditEducation && <div onClick={() => setIsEditEducation(true)} className="w-fit flex justify-center items-center gap-3 cursor-pointer hover:shadow-lg px-3 py-1.5 rounded"><Pencil size={15} />Edit</div>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditEducation ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditEducation ? (
                      <Input
                        value={profileInfo?.institution}
                        onChange={(e) => handleSetProfileInfor('institution', e.target.value)}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="Institution"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Institution</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{userInfo?.institution}</p>
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditEducation ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditEducation ? (
                      <Input
                        value={profileInfo?.fieldOfStudy}
                        onChange={(e) => handleSetProfileInfor('fieldOfStudy', e.target.value)}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="Field Of Study"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Field Of Study</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{userInfo?.fieldOfStudy}</p>
                      </div>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditEducation ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditEducation ? (
                      <Textarea
                        placeholder="Describes your role"
                        onChange={(e) => handleSetProfileInfor('fieldDescription', e.target.value)}
                        value={profileInfo?.fieldDescription || ""}
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Role Description</p>
                        <p className="text-lg leading-relaxed text-gray-700 line-clamp-4">{userInfo?.fieldDescription}</p>
                      </div>

                    )}
                  </div>
                </div>
                {isEditEducation && <div className="w-full flex justify-end py-2 p-x1 gap-3"><Button variant="outline" onClick={() => setIsEditEducation(false)}>Cancel</Button><Button onClick={updateEducationByToken} isLoading={isLoading.updateEducation}>Save</Button></div>}
              </div>
            </div>
          </motion.div>

          {/* Addresss */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 md:mb-12"
          >

            <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-md shadow-xl border border-indigo-100/50">
              <div className="p-4 md:p-8">
                <div className="flex items-center justify-between gap-2 md:gap-3 mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <div className="p-1.5 md:p-2 rounded-full bg-indigo-100">
                      <Link className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" to={""} />
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-indigo-800">Address</h2>
                  </div>
                  {!isEditAddress && <div onClick={handleEditOpenCountries} className="w-fit flex justify-center items-center gap-3 cursor-pointer hover:shadow-lg px-3 py-1.5 rounded"><Pencil size={15} />Edit</div>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditAddress ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditAddress ? (
                      <Select placeholder="Select your country" showSearch onSearch={(e) => handleCountriesSearch(e)} onChange={(e) => updateountry(e)} value={profileInfo?.country || undefined} className="w-full">
                        {activeCountries?.map((country) => (<option value={country?.country} key={country.iso3}>
                          {country.country}
                        </option>))}
                      </Select>
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Country</p>
                        <p className="text-lg leading-relaxed text-indigo-700 line-clamp-4">{userInfo?.country || "--"}</p>
                      </div>

                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditAddress ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditAddress ? (
                      <Select
                        defaultValue={profileInfo?.state || undefined}
                        loading={isCountriesLoading.getStates}
                        disabled={!userInfo.country}
                        onChange={(e) => updateState(e)}
                        showSearch
                        onSearch={(e) => handleStatesSearch(e)}
                        placeholder="Select your state" className="w-full">
                        {activeStates?.map((state) => (<option value={state?.name} key={state?.state_code}>
                          {state?.name}
                        </option>))}
                      </Select>
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">State</p>
                        <p className="text-lg leading-relaxed text-indigo-700 line-clamp-4">{userInfo?.state || "--"}</p>
                      </div>

                    )}
                  </div>

                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditAddress ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditAddress ? (
                      <Select
                        defaultValue={profileInfo?.city || undefined}
                        loading={isCountriesLoading.getCities}
                        disabled={!userInfo.country || !userInfo.state}
                        onChange={(e) => handleSetProfileInfor("city", e)}
                        showSearch onSearch={(e) => handleCitiesSearch(e)}
                        placeholder="Select your city" className="w-full">
                        {activeCities?.map((city) => (<option value={city} key={city}>
                          {city}
                        </option>))}
                      </Select>
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">City</p>
                        <p className="text-lg leading-relaxed text-indigo-700 line-clamp-4">{userInfo?.city || "--"}</p>
                      </div>

                    )}
                  </div>
                  <div className={`flex items-center gap-3 p-3 md:p-4 rounded-xl ${isEditAddress ? 'bg-white border border-indigo-200' : 'bg-indigo-50/50'}`}>
                    {isEditAddress ? (
                      <Input
                        defaultValue={profileInfo?.zinPinCode || ""}
                        onChange={(e) => handleSetProfileInfor('zinPinCode', e.target.value)}
                        className="flex-1 border-indigo-200 bg-white"
                        placeholder="Enter Pin/Zip Code"
                        type="number"
                        max={999999}
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Zip/Pin Code</p>
                        <p className="text-sm md:text-base font-medium text-indigo-700">{userInfo?.zinPinCode || "--"}</p>
                      </div>
                    )}
                  </div>
                </div>
                {isEditAddress && <div className="w-full flex justify-end py-2 p-x1 gap-3">
                  <Button variant="outline" onClick={() => setIsEditAddress(false)}>Cancel</Button>
                  <Button onClick={updateAddressByToken} isLoading={isLoading.updateAddress}>Save</Button>
                </div>}
              </div>
            </div>
          </motion.div>
          {openLogout && <ConfirmLogoutModal open={openLogout} onOpenChange={setOpenLogout} />}
          <Button onClick={() => setOpenLogout(true)} className="rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
          >Logout</Button>
          {openProfilePictureModal && <ProfilePictureModal open={openProfilePictureModal} onClose={() => setOpenProfilePictureModal(false)} />}
        </div>
      </main >
    </div >
  );
}
