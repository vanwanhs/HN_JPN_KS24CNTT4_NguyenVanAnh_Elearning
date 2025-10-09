import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Lesson } from "../../utils/types";

export const getAllLessons = createAsyncThunk(
  "lessons/getAll",
   async () => {
  const response = await axios.get<Lesson[]>("http://localhost:8080/lessons");
  return response.data;
});

const lessonSlice = createSlice({
  name: "lessons",
  initialState: {
    list: [] as Lesson[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLessons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLessons.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getAllLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Lỗi không xác định";
      });
  },
});

export default lessonSlice.reducer;
