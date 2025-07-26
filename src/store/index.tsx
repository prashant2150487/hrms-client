import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import loaderReducer from "../features/loader";
export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    loader: loaderReducer,
  },
});

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
