import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  isOtpSentToEmail?: boolean;
  isOtpVerified?: boolean;
  isLoading?: boolean;
};

const initialState: AuthState = {
  isOtpSentToEmail: false,
  isOtpVerified: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtpSentToEmail: (state, action) => {
      state.isOtpSentToEmail = action.payload;
    },
    setOtpVerified: (state, action) => {
      state.isOtpVerified = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setOtpSentToEmail, setOtpVerified, setLoading } =
  authSlice.actions;

export default authSlice.reducer;
