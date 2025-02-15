import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  userId?:string
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  gender?: string;
  imgUrl?: string;
  skills?: string[];
}

const defaultState: userState = {
  userId:"",
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  gender: "",
  imgUrl: "",
  skills: []
};

const initialState: userState = defaultState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<userState>) => {
      return { ...state, ...action.payload };
    },
    removeUser: () => {
      return defaultState;
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
