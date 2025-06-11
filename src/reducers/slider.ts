import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliderState = {
  open: boolean;
};

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    open: false,
  },
  reducers: {
    setSliderValue: (state: SliderState, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setSliderValue } = sliderSlice.actions;
export default sliderSlice.reducer;
