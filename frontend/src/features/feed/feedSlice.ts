import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedData } from "../types";

interface FeedState {
  data: FeedData[];
  loading: boolean;
}

const initialState: FeedState = {
  data: [],
  loading: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeed: (state, action: PayloadAction<FeedData[]>) => {
      state.data = [...action.payload];
    },
    removeFromFeed: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((r) => r._id !== action.payload);
    },
    clearFeed: (state) => {
      state.data = [];
    },
  },
});

export const { addFeed, clearFeed, removeFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
