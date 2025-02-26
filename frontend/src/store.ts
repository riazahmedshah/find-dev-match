import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import feedReducer from "./features/feed/feedSlice";
import connectionReducer from "./features/connection/getConnectionSlice"
import requests from "./features/connection/requsetSice"


export const store = configureStore({
  reducer:{
    user:userReducer,
    feed:feedReducer,
    connections:connectionReducer,
    requests: requests
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch