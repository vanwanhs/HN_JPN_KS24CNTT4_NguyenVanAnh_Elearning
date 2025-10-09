import { configureStore } from "@reduxjs/toolkit";
import lessonSlice from "./slices/lessonSlice";
import SubjectSlice from "./slices/subjectSlice"
import PaginationSubjectSlice from "./slices/paginationSubjectSlice"
export const store = configureStore({
  reducer: {
    lesson:lessonSlice,
    subject:SubjectSlice,
    paginationSubjects: PaginationSubjectSlice,
  },
});
