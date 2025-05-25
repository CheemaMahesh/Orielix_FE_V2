import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Response type from API
export interface UserResponse {
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
    portfolioLink: string | null;
    githubLink: string | null;
    linkedinLink: string | null;
    twitterLink: string | null;
    facebookLink: string | null;
    instagramLink: string | null;
    youtubeLink: string | null;
    phone: string | null;
    country: string | null;
    zipCode: string | null;
    state: string | null;
    city: string | null;
    countryRank: number | null;
    stateRank: number | null;
    institutionRank: number | null;
  };
}

const initialState: UserResponse = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserResponse>) => {
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
