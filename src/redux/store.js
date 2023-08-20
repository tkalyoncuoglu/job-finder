import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobslice";
export default configureStore({
  reducer: jobReducer,
});
