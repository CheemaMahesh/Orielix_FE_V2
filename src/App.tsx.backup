import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Session from "./pages/Session";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Onboarding from "./pages/auth/Onboarding";
import EmailVerification from "./pages/auth/EmailVerification";
import Dashboard from "./pages/Dashboard";
import DiscussionForum from "./pages/DiscussionForum";
import Events from "./pages/Events";
import PathFinder from "./pages/PathFinder";
import Community from "./pages/Community";
import Sessions from "./pages/Sessions";
import UserProfile from "./pages/UserProfile";
import Notifications from "./pages/Notifications";
import FindJob from "./pages/FindJob";
import CollabProjects from "./pages/CollabProjects";
import Settings from "./pages/Settings";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/team" element={<Session />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/email-verification" element={<EmailVerification />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/discussion-forum" element={<DiscussionForum />} />
              <Route path="/events" element={<Events />} />
              <Route path="/path-finder" element={<PathFinder />} />
              <Route path="/community" element={<Community />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/find-job" element={<FindJob />} />
              <Route path="/collab-projects" element={<CollabProjects />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/notifications" element={<Notifications />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
