import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../types";



interface UserState {
  data: UserData | null;
  loading: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
    removeUser: (state) => {
      state.data = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
});

export const { addUser, removeUser, setLoading } = userSlice.actions;
export default userSlice.reducer;