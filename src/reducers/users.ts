import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Response type from API
export interface AllUserResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    dob: string | null;
    updateAt: string;
    createdAt: string;
    userType: string;
    isVerified: boolean;
    auraPoints: number;
    profileImage: string | null;
    profilePercentage: number;
    address: string | null;
    zinPinCode: string | null;
    about: string | null;
    institution: string | null;
    fieldOfStudy: string | null;
    fieldDescription: string | null;
    isActice: boolean;
    intrests: string[];
    isActive: boolean;
    isDeleted: boolean;
    username: string | null;
    phone: string | null;
  }[];
}

const initialState: AllUserResponse = {
  success: false,
  user: [
    {
      id: "",
      email: "",
      firstName: null,
      lastName: null,
      dob: null,
      updateAt: "",
      createdAt: "",
      userType: "",
      isVerified: false,
      auraPoints: 0,
      profileImage: null,
      profilePercentage: 0,
      address: null,
      zinPinCode: null,
      about: null,
      institution: null,
      fieldOfStudy: null,
      fieldDescription: null,
      isActice: false,
      intrests: [],
      isActive: false,
      isDeleted: false,
      username: null,
      phone: null,
    },
  ],
};

const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {
    addAllUsers: (state, action: PayloadAction<AllUserResponse>) => {
      state.user = action.payload.user;
    },
    clearUsers: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { addAllUsers, clearUsers } = allUserSlice.actions;

export default allUserSlice.reducer;
