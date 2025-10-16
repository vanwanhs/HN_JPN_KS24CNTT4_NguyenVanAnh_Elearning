import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Lesson } from "../../utils/types";

// =======================
//  FETCH (Phân trang, tìm kiếm, lọc)
// =======================
export const getAllLessons = createAsyncThunk(
  "lessons/getAll",
  async ({
    page,
    limit,
    search = "",
    status = "",
    sortField = "",
    sortOrder = "asc",
  }: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sortField?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const params: any = { _page: page, _limit: limit };
    if (search) params.q = search;
    if (status) params.status = status;
    if (sortField) {
      params._sort = sortField;
      params._order = sortOrder;
    }

    const res = await axios.get<Lesson[]>("http://localhost:8080/lessons", { params });
    const totalCount = parseInt(res.headers["x-total-count"] || "0");
    return { data: res.data, totalCount };
  }
);

// =======================
//  ADD
// =======================
export const addLesson = createAsyncThunk(
  "lessons/addLesson",
  async (newLesson: { lesson_name: string; time: number; status: string; subject_id: number }) => {
    const res = await axios.post("http://localhost:8080/lessons", {
      ...newLesson,
      created_at: new Date().toISOString(),
    });
    return res.data;
  }
);

// =======================
//  UPDATE
// =======================
export const updateLesson = createAsyncThunk(
  "lessons/updateLesson",
  async (updatedLesson: Lesson) => {
    const res = await axios.put(`http://localhost:8080/lessons/${updatedLesson.id}`, updatedLesson);
    return res.data;
  }
);

// =======================
//  DELETE
// =======================
export const deleteLesson = createAsyncThunk("lessons/deleteLesson", async (id: number) => {
  await axios.delete(`http://localhost:8080/lessons/${id}`);
  return id;
});

// =======================
//  SLICE
// =======================
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
      // FETCH
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
      })

      // ADD
      .addCase(addLesson.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateLesson.fulfilled, (state, action) => {
        const index = state.list.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // DELETE
      .addCase(deleteLesson.fulfilled, (state, action) => {
        state.list = state.list.filter((l) => l.id !== action.payload);
      });
  },
});

export default lessonSlice.reducer;
