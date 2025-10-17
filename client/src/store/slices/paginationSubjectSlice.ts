import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Subject } from "../../utils/types";

const BASE_URL = "http://localhost:8080/subjects";

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
    }

    const res = await axios.get<Subject[]>(BASE_URL, { params });
    const totalCount = parseInt(res.headers["x-total-count"] || "0");
    return { data: res.data, totalCount };
  }
);


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

export const updateSubject = createAsyncThunk(
  "subjects/updateSubject",
  async (updatedSubject: { id: number; subject_name: string; status: string }) => {
    const res = await axios.put(`${BASE_URL}/${updatedSubject.id}`, updatedSubject);
    return res.data;
  }
);


export const deleteSubject = createAsyncThunk(
  "subjects/deleteSubject",
  async (id: number) => {
    await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
);


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

      .addCase(addSubject.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.list.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export default paginationSubjectSlice.reducer;
