
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Subject } from "../../utils/types";

export const fetchSubjectsByPage = createAsyncThunk(
  "subjects/fetchByPage",
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

    const res = await axios.get<Subject[]>("http://localhost:8080/subjects", { params });
    const totalCount = parseInt(res.headers["x-total-count"] || "0");
    return { data: res.data, totalCount };
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
      });
  },
});

export default paginationSubjectSlice.reducer;
