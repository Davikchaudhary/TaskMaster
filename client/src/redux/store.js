import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boardsSlice"; // Adjust the import to match your file structure

const store = configureStore({
  reducer: {
    boards: boardsReducer, // Provide the correct reducer
  },
});

export default store;
