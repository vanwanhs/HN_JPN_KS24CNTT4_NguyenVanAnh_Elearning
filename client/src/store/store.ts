import { configureStore } from "@reduxjs/toolkit";
import lessonSlice from "./slices/lessonSlice";
import home_slice from "./slices/homeSlice";
import PaginationSubjectSlice from "./slices/paginationSubjectSlice";

export const store = configureStore({
  reducer: {
    lesson: lessonSlice,
    home: home_slice,
    paginationSubjects: PaginationSubjectSlice,
  },
});

export default store;
