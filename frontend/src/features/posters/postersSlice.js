import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../helpers/api";

const initialState = {
  posters: [],
  status: "idle",
  error: null,
};

export const postersSlice = createSlice({
  name: "posters",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchPosters.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posters = state.posters.concat(action.payload);
      })
      .addCase(fetchPosters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchPosters = createAsyncThunk(
  "posters/fetchPosters",
  async (keyword) => {
    const response = await sendRequest(`/api/search?keyword=${keyword}`);
    return response.data;
  }
);

export const selectAllPosters = (state) => state.posters.posters;

export default postersSlice.reducer;
