import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Subject } from "../../utils/types";

const BASE_URL = "http://localhost:8080/subjects";

// =======================
//  FETCH - Phân trang + Lọc + Tìm kiếm + Sắp xếp
// =======================
export const fetchSubjectsByPage = createAsyncThunk(
  "subjects/fetchByPage",
  async ({
    page,
    limit,
    search = "",
    status = "",
    sort = "",
  }: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sort?: string;
  }) => {
    const params: any = { _page: page, _limit: limit };
    if (search) params.q = search;
    if (status) params.status = status;

    if (sort === "name_asc") {
      params._sort = "subject_name";
      params._order = "asc";
    } else if (sort === "name_desc") {
      params._sort = "subject_name";
      params._order = "desc";
    } else if (sort === "date_new") {
      params._sort = "created_at";
      params._order = "desc";
    } else if (sort === "date_old") {
      params._sort = "created_at";
      params._order = "asc";
    }

    const res = await axios.get<Subject[]>(BASE_URL, { params });
    const totalCount = parseInt(res.headers["x-total-count"] || "0");
    return { data: res.data, totalCount };
  }
);

// =======================
//  ADD
// =======================
export const addSubject = createAsyncThunk(
  "subjects/addSubject",
  async (newSubject: { subject_name: string; status: string }) => {
    const res = await axios.post(BASE_URL, {
      ...newSubject,
      created_at: new Date().toISOString(),
    });
    return res.data;
  }
);

// =======================
//  UPDATE
// =======================
export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async (updatedSubject: { id: number; subject_name: string; status: string }) => {
    const res = await axios.put(`${BASE_URL}/${updatedSubject.id}`, updatedSubject);
    return res.data;
  }
);

// =======================
//  DELETE
// =======================
export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);

// =======================
//  SLICE
// =======================
const paginationSubjectSlice = createSlice({
  name: "paginationSubjects",
  initialState: {
    list: [] as Subject[],
    loading: false,
    error: null as string | null,
    totalPages: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSubjectsByPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectsByPage.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.totalPages = Math.ceil(action.payload.totalCount / 6);
        state.loading = false;
      })
      .addCase(fetchSubjectsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lỗi không xác định";
      })

      // ADD
      .addCase(addSubject.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // DELETE
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default paginationSubjectSlice.reducer;
