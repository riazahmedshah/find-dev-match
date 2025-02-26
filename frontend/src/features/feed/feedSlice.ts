import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedData } from "../types";

interface FeedState {
  data: FeedData | null;
  loading: boolean;
}

const initialState: FeedState = {
  data: null,
  loading: false,
};

const feedSlice = createSlice({
  name:"feed",
  initialState,
  reducers:{
    addFeed: (state, action: PayloadAction<FeedData>) => {
      state.data = action.payload
    },
    clearFeed: (state) => {
      state.data = null;
    }
  }
});

export const {addFeed, clearFeed} = feedSlice.actions;
export default feedSlice.reducer;