import { createSlice } from "@reduxjs/toolkit";

export type NotificationType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId?: string;
  isRead: boolean;
  isDeleted: boolean;
  type: string;
};

export type NotificationState = {
  notifications?: NotificationType[];
  loading?: boolean;
};

const initialState: NotificationState = {};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setNotificationLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { addNotifications, clearNotifications, setNotificationLoading } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
