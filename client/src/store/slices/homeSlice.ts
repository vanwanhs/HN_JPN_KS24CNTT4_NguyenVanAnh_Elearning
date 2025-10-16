// src/store/slices/homeSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Subject {
  id: number;
  subject_name: string;
  status: string;
  created_at?: string;
}

interface SubjectState {
  subjects: Subject[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}

const initialState: SubjectState = {
  subjects: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  perPage: 8,
};

//  Gọi API phân trang
export const getAllSubjects = createAsyncThunk(
  "home/getAllSubjects",
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await axios.get(
      `http://localhost:8080/subjects?_page=${page}&_limit=${limit}`
    );

    const totalItems = Number(res.headers["x-total-count"] || 0);
    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: res.data,
      totalPages,
      totalItems,
      currentPage: page,
    };
  }
);

const home_slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getAllSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lỗi khi tải danh sách môn học";
      });
  },
});

export const { setPage } = home_slice.actions;
export default home_slice.reducer;
