import { configureStore } from "@reduxjs/toolkit";
import postersReducer from "../features/posters/postersSlice";

export default configureStore({
  reducer: {
    posters: postersReducer,
  },
});
