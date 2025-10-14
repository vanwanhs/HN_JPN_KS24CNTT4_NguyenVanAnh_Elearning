
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Lesson } from "../../utils/types";

export const getAllLessons = createAsyncThunk(
  "lessons/getAll",
  async ({
    page,
    limit,
    search = "",
    status = "",
  }: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
  }) => {
    const params: any = { _page: page, _limit: limit };
    if (search) params.q = search;
    if (status) params.status = status;

    const res = await axios.get<Lesson[]>("http://localhost:8080/lessons", { params });
    const totalCount = parseInt(res.headers["x-total-count"] || "0");
    return { data: res.data, totalCount };
  }
);

const lessonSlice = createSlice({
  name: "lessons",
  initialState: {
    list: [] as Lesson[],
    loading: false,
    error: null as string | null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLessons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllLessons.fulfilled, (state, action) => {
        const limit = action.meta.arg.limit; 
        state.list = action.payload.data;
        state.totalPages = Math.ceil(action.payload.totalCount / limit);
        state.loading = false;
      })
      .addCase(getAllLessons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Lỗi không xác định";
      });
  },
});

export default lessonSlice.reducer;
