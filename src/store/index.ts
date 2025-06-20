import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "../reducers/me";
import eventSlice from "../reducers/events";
import sessionsSlice from "../reducers/sessions";
import intrestSlice from "../reducers/Intrests";
import allUserSlice from "../reducers/users";
import countriesSlice from "../reducers/countries";
import ranksSlice from "../reducers/ranks";
import notificationsSlice from "../reducers/notifications";
import sliderSlice from "../reducers/slider";
import authSlice from "../reducers/auth";

// You'll add reducers here later
const store = configureStore({
  reducer: {
    userSlice,
    eventSlice,
    sessionsSlice,
    intrestSlice,
    allUserSlice,
    countries: countriesSlice,
    ranks: ranksSlice,
    notifications: notificationsSlice,
    slider: sliderSlice,
    auth: authSlice,
  },
  // Adding middleware for RTK-Query if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // Add API middleware here if using RTK Query
    ]),
});

// Optional, but recommended for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
