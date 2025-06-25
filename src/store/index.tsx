import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
  },
});

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
