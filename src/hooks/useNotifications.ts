import { useAppSelector } from "@/store/tsSupport";

export const useNotifications = () => {
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );
  const showNotificationStatus = () => {
    if (notifications && notifications.length > 0) {
      return notifications.some((notification) => !notification.isRead);
    }
    return false;
  };

  return { showNotificationStatus };
};
