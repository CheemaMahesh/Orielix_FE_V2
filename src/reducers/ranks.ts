import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CountryTopRankersType = {
  auraPoints: number;
  countryRank: number;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
};

export type StateTopRankersType = CountryTopRankersType & {
  stateRank?: number;
};

export type InstitutionTopRankersType = StateTopRankersType & {
  institutionRank?: number;
};

export type RanksType = {
  countryTopRankers: CountryTopRankersType[];
  stateTopRankers: StateTopRankersType[];
  institutionTopRankers: InstitutionTopRankersType[];
};

const initialState: RanksType = {
  countryTopRankers: [],
  stateTopRankers: [],
  institutionTopRankers: [],
};

const ranksSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addRaanks: (state, action: PayloadAction<RanksType>) => {
      state.countryTopRankers = action.payload.countryTopRankers;
      state.stateTopRankers = action.payload.stateTopRankers;
      state.institutionTopRankers = action.payload.institutionTopRankers;
    },
    clearRanks: (state) => {
      state.countryTopRankers = [];
      state.stateTopRankers = [];
      state.institutionTopRankers = [];
    },
  },
});

export const { addRaanks, clearRanks } = ranksSlice.actions;

export default ranksSlice.reducer;
