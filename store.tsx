import { configureStore } from "@reduxjs/toolkit";
import albumReducer from "./slices/albumSlice"; // Update the import statement

const store = configureStore({
  reducer: {
    album: albumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
