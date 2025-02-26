import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { requestData } from "../types";

interface requestState {
  data : requestData[] | null,
  loading: boolean
}

const initialState : requestState = {
  data: [],
  loading: false
}

const requestSlice = createSlice({
  name:"requests",
  initialState,
  reducers:{
    setRequeste:(state, action: PayloadAction<requestData[]>) => {
      state.data = action.payload
    },
    removeRequser: (state, action: PayloadAction<string>) => {
      state.data = (state.data ?? []).filter((r) => r._id !== action.payload);
    },
    clearRequests: (state) => {
      state.data = []
    }
  }
});

export const {clearRequests, setRequeste, removeRequser} = requestSlice.actions

export default requestSlice.reducer