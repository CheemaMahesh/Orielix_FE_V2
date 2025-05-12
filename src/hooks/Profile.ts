import { useProfile } from "@/Api/Profile";
import { toast } from "@/components/ui/use-toast";
import { addEvents, setEventLoading } from "@/reducers/events";
import { addUser } from "@/reducers/me";
import { useDispatch } from "react-redux";
import { addSessions, setSessionLoading } from "@/reducers/sessions";

export const useCallProfileInfo = () => {
  const { getAllEvents, getMe, getAllSessions } = useProfile();
  const dispatch = useDispatch();

  const getAllEventsByToken = async () => {
    dispatch(setEventLoading(true));
    const res = await getAllEvents();
    if (res) {
      if (res.success) {
        dispatch(addEvents(res.events));
      }
      dispatch(setEventLoading(false));
    } else {
      dispatch(setEventLoading(false));
      toast({
        title: "Error",
        description:
          "An error occurred while fetching events. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getMeByToken = async () => {
    const res = await getMe();
    if (res) {
      if (res.success) {
        dispatch(addUser({ user: res.user }));
      }
    } else {
      toast({
        title: "Error",
        description: "An error occurred while registering. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getAllSessionsByToken = async () => {
    dispatch(setSessionLoading(true));
    const res = await getAllSessions();
    if (res) {
      if (res.success) {
        dispatch(addSessions(res.sessions));
      }
      dispatch(setSessionLoading(false));
    } else {
      dispatch(setSessionLoading(false));
      toast({
        title: "Error",
        description:
          "An error occurred while fetching sessions. Please try again.",
        variant: "destructive",
      });
    }
  };
  return {
    getAllEventsByToken,
    getMeByToken,
    getAllSessionsByToken,
  };
};
