// src/slice/subjectSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Subject } from "../../utils/types";

// Gọi API từ db.json
export const getAllSubjects = createAsyncThunk("subjects/getAll", async () => {
  const response = await axios.get<Subject[]>("http://localhost:8080/subjects");
  return response.data;
});

const subjectSlice = createSlice({
  name: "subjects",
  initialState: {
    list: [] as Subject[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lỗi không xác định";
      });
  },
});

export default subjectSlice.reducer;
