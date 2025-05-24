import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryType, StateType } from "@/Api/External/useContries";

export type CountriesType = {
  countries?: CountryType[];
  states?: StateType[];
  city?: CountryType[];
};

const initialState: CountriesType = {
  countries: [],
  states: [],
  city: [],
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addCountries: (state, action: PayloadAction<CountriesType>) => {
      state.countries = action.payload.countries || [];
    },
    clearCountries: (state) => {
      state.countries = [];
      state.states = [];
      state.city = [];
    },
    addStates: (state, action: PayloadAction<CountriesType>) => {
      state.states = action?.payload?.states || [];
    },
    clearState: (state) => {
      state.states = [];
      state.city = [];
    },
  },
});

export const { addCountries, clearCountries, addStates, clearState } =
  countriesSlice.actions;

export default countriesSlice.reducer;
