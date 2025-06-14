import { useProfile } from "@/Api/Profile";
import { toast } from "@/components/ui/use-toast";
import { addEvents, clearEvents, setEventLoading } from "@/reducers/events";
import { addUser } from "@/reducers/me";
import { useDispatch } from "react-redux";
import { addSessions, setSessionLoading } from "@/reducers/sessions";
import { addIntrests, setIntrestLoading } from "@/reducers/Intrests";
import { addRaanks } from "@/reducers/ranks";
import {
  addNotifications,
  setNotificationLoading,
} from "@/reducers/notifications";

export const useCallProfileInfo = () => {
  const {
    getAllEvents,
    getMe,
    getAllSessions,
    getAllIntrests,
    getRankings,
    getAllNotifications,
  } = useProfile();
  const dispatch = useDispatch();

  const getAllNotificationsByToken = async (userid: string) => {
    // dispatch(setNotificationLoading(true));
    const res = await getAllNotifications(userid);
    if (res) {
      if (res.success) {
        dispatch(addNotifications(res.notifications));
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch notifications.",
          variant: "destructive",
        });
      }
    }
    // dispatch(setNotificationLoading(false));
  };

  const callOnlyMe = async () => {
    const res = await getMe();
    if (res) {
      if (res.success) {
        dispatch(addUser({ user: res.user }));
      }
    } else {
      console.log("Error fetching user data");
    }
  };

  const getAllEventsByToken = async ({ type }: { type?: string }) => {
    dispatch(setEventLoading(true));
    const res = await getAllEvents({ type });
    if (res) {
      if (res.success) {
        dispatch(addEvents(res.events));
      }
    }
    dispatch(setEventLoading(false));
  };

  const getAllRankingsByToken = async () => {
    const res = await getRankings();
    if (res) {
      if (res.success) {
        dispatch(addRaanks(res.rankings));
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch rankings.",
          variant: "destructive",
        });
      }
    } else {
      console.log("Error fetching rankings data");
    }
  };

  const getMeByToken = async () => {
    const res = await getMe();
    if (res) {
      if (res.success) {
        dispatch(addUser({ user: res.user }));
        await getAllRankingsByToken();
        await getAllNotificationsByToken(res?.user?.id || "");
      }
    } else {
      console.log("Error fetching user data");
    }
  };

  const getAllSessionsByToken = async ({
    category,
    type,
  }: {
    category?: string;
    type?: string;
  }) => {
    dispatch(setSessionLoading(true));
    const res = await getAllSessions({ category, type });
    if (res) {
      if (res.success) {
        dispatch(addSessions(res.sessions));
      }
    }
    dispatch(setSessionLoading(false));
  };

  const getAllIntrestsByToken = async () => {
    dispatch(setIntrestLoading(true));
    const res = await getAllIntrests();
    if (res) {
      if (res.success) {
        dispatch(addIntrests(res.intrests));
      }
    }
    dispatch(setIntrestLoading(false));
  };

  const getAllRolesByToken = async () => {};

  return {
    getAllEventsByToken,
    getMeByToken,
    getAllSessionsByToken,
    getAllIntrestsByToken,
    getAllRolesByToken,
    getAllRankingsByToken,
    getAllNotificationsByToken,
    callOnlyMe,
  };
};
