import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Presenter {
  id: string;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  institution: string | null;
  about: string | null;
  designation: string | null;
}

export type EventType = {
  id: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  createdAt: string;
  updatedAt: string;
  eventImage: string;
  createdBy: string;
  status: "upcoming" | "past" | "canceled" | string;
  isDeleted: boolean;
  duration: string | null;
  eventType: string | null;
  externalLink: string | null;
  presenterId: string | null;
  presenter: Presenter | null;
  joined: boolean | null;
  _count?: {
    joinedUsers?: number;
  };
  withbreaks: boolean | null;
};

interface EventsState {
  events: EventType[];
  loading?: boolean;
}

// Initial state
const initialState: EventsState = {
  events: [],
  loading: false,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvents: (state, action: PayloadAction<EventType[]>) => {
      state.events = action.payload;
    },
    clearEvents: (state) => {
      state.events = [];
    },
    setEventLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
export const { addEvents, clearEvents, setEventLoading } = eventSlice.actions;

export default eventSlice.reducer;
