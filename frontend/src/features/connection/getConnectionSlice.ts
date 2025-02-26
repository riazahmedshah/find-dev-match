import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { connectionData } from "../types";

interface connectionState {
  data : connectionData[] | null;
  loading: boolean;
}

const initialState : connectionState = {
  data : [],
  loading : false
}

const connectionSlice = createSlice({
  name:"connections",
  initialState,
  reducers:{
    setConnections: (state, action: PayloadAction<connectionData[]>) => {
        state.data = action.payload;
    },
    clearConnections :(state) => {
      state.data = []
    } 
  }
});

export const {setConnections, clearConnections} = connectionSlice.actions
export default connectionSlice.reducer;