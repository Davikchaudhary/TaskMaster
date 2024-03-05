import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
    try {
      const response = await axios.get("/boards"); // Assuming your Express server listens on the same host
      // Assuming response.data is an array of boards
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch boards from the server");
    }
  });
  
