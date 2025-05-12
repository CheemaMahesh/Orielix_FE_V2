import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Presenter {
  id: string;
  firstName: string;
  lastName: string | null;
  profileImage: string | null;
  institution: string | null;
  about: string | null;
  designation: string | null;
}

export interface SessionType {
  id: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  createdBy: string | null;
  status: "upcoming" | "live" | "completed" | string;
  isDeleted: boolean;
  name: string;
  description: string;
  externalLink: string | null;
  type: string | null;
  duration: string;
  date: string;
  time: string;
  location: string | null;
  isActive: boolean;
  presenterId: string;
  presenter: Presenter;
  joined: boolean | null;
  _count?: {
    joinedUsers?: number;
  };
  withbreaks: boolean | null;
}

interface EventsState {
  sessions: SessionType[];
  loading?: boolean;
}

// Initial state
const initialState: EventsState = {
  sessions: [],
  loading: false,
};

const sessionsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addSessions: (state, action: PayloadAction<SessionType[]>) => {
      state.sessions = action.payload;
    },
    clearSessions: (state) => {
      state.sessions = [];
    },
    setSessionLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addSessions, clearSessions, setSessionLoading } =
  sessionsSlice.actions;

export default sessionsSlice.reducer;
