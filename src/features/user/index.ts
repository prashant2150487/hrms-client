import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  email: string;
  role: string;
  phone: string;
  isActive: boolean;
  organization: string;
  token: string;
  firstName: string;
  lastName: string;

}
interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      console.log(action.payload);
      state.user = { ...action.payload };
      localStorage.setItem("token", action.payload.token);
    },
    clearUser(state) {
      state.user = null;
      // localStorage.removeItem("token");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
