import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IntrestType = {
  id: string;
  name: string;
  description: string;
};

const initialState = {
  intrests: [] as IntrestType[],
  loading: false,
};

const intrestSlice = createSlice({
  name: "intrest",
  initialState,
  reducers: {
    addIntrests: (state, action: PayloadAction<IntrestType[]>) => {
      const intrest = action.payload;
      state.intrests = intrest;
    },
    clearIntrests: (state) => {
      state.intrests = [];
    },
    setIntrestLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addIntrests, clearIntrests, setIntrestLoading } =
  intrestSlice.actions;
export default intrestSlice.reducer;
