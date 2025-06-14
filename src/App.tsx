import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useProfile } from "./Api/Profile";
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import { useCallProfileInfo } from "./hooks/Profile";
import About from "./pages/About";
import EmailVerification from "./pages/auth/EmailVerification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import Session from "./pages/Session";
import Sessions from "./pages/Sessions";
import UserProfile from "./pages/UserProfile";
import { RootState } from "./store";
import { Admin } from "./pages/Admin/Admin";


const queryClient = new QueryClient();

const App = () => {
  const userInfo = useSelector((state: RootState) => state.userSlice.user);
  const { events, loading: eventsLoading } = useSelector((state: RootState) => state.eventSlice);
  const { sessions, loading: sessionLoading } = useSelector((state: RootState) => state.sessionsSlice);
  const { intrests, loading: intrestLoading } = useSelector((state: RootState) => state.intrestSlice);


  const token = localStorage.getItem("token");

  const { getMeByToken, getAllEventsByToken, getAllSessionsByToken, getAllIntrestsByToken } = useCallProfileInfo();
  const { id, userType } = userInfo || {};
  const { isLoading } = useProfile();

  const isAuthenticated = !!localStorage.getItem('token');

  const isAdmin = userType === "admin" || userType === "superadmin";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const publicPaths = ["/login", "/register", "/about", "/forgot-password", "/email-verification", "/"];
    const currentPath = window.location.pathname;
    const isPublicPath = publicPaths.includes(currentPath);

    if (token && isPublicPath) {
      setTimeout(() => {
        window.location.replace("/dashboard");
      }, 0);
    } else if (!token && !isPublicPath) {
      setTimeout(() => {
        window.location.replace("/login");
      }, 0);
    }
  }, []);


  useEffect(() => {
    if (!isLoading.me && token && !id) {
      getMeByToken();
    }
    if (!eventsLoading && (!events || events.length === 0) && token) {
      getAllEventsByToken({ type: undefined });
    }
    if (!sessionLoading && (!sessions || sessions.length === 0) && token) {
      getAllSessionsByToken({ category: undefined, type: undefined });
    }
    if (!intrestLoading && (!intrests || intrests.length === 0) && token) {
      getAllIntrestsByToken();
    }
  }, [id, isLoading.me, token]);
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/email-verification" element={<EmailVerification />} />
              </Route>

              {/* Private Routes */}
              <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/community" element={<Community />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/admin" element={<Admin />} />
              </Route>

              {/* Publicly Accessible Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Session />} />

              {/* Catch-All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
