import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  getAllLessons,
  addLesson,
  updateLesson,
  deleteLesson,
} from "../store/slices/lessonSlice";
import deletee from "../image/_Button base.png";
import pen from "../image/pen.png";
import { FiPlus } from "react-icons/fi";
import Pagination from "./Pagination";
import ModalAddLesson from "./ModalAddLesson";
import checkbox from "../image/_BaseCheckboxStates.png";
import ModalUpdateLesson from "./ModalUpdateLesson";
import arrow_down from "../image/arrow-down.png";
import axios from "axios";

export default function ManagementLesson() {
  const dispatch: any = useDispatch();
  const { list: lessons, loading, totalPages } = useSelector(
    (state: any) => state.lesson
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const [showModal, setShowModal] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [subjects, setSubjects] = useState<any[]>([]);

  // Sắp xếp
  const [sortField, setSortField] = useState<"lesson_name" | "time" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    dispatch(
      getAllLessons({
        page: currentPage,
        limit: perPage,
        search,
        status: statusFilter,
        sortField,
        sortOrder,
      })
    );
  }, [dispatch, currentPage, search, statusFilter, sortField, sortOrder]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/subjects")
      .then((res) => setSubjects(res.data));
  }, []);

  // Thêm bài học
  const handleAddLesson = async (newLesson: {
    lesson_name: string;
    time: number;
    status: string;
    subject_id: number;
  }) => {
    await dispatch(addLesson(newLesson));
    dispatch(
      getAllLessons({
        page: currentPage,
        limit: perPage,
        search,
        status: statusFilter,
      })
    );
    setShowModal(false);
  };

  // Sửa bài học
  const handleEditLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setIsUpdateOpen(true);
  };

  const handleUpdateLesson = async (updatedLesson: any) => {
    await dispatch(updateLesson(updatedLesson));
    dispatch(
      getAllLessons({
        page: currentPage,
        limit: perPage,
        search,
        status: statusFilter,
      })
    );
    setIsUpdateOpen(false);
  };

  // Xoá bài học
  const handleDeleteLesson = async (id: number) => {
  const result = await Swal.fire({
    title: "Xác nhận xóa",
    text: "Bạn có chắc muốn xoá bài học này không?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await dispatch(deleteLesson(id));
      await dispatch(
        getAllLessons({
          page: currentPage,
          limit: perPage,
          search,
          status: statusFilter,
        })
      );

      Swal.fire({
        title: "Đã xóa!",
        text: "Bài học đã được xoá thành công.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Lỗi!",
        text: "Không thể xoá bài học. Vui lòng thử lại.",
        icon: "error",
      });
    }
  }
};

  const handleToggleComplete = async (lesson: any) => {
    const updated = {
      ...lesson,
      status:
        lesson.status === "completed" ? "incomplete" : "completed",
    };

    await dispatch(updateLesson(updated));

    dispatch(
      getAllLessons({
        page: currentPage,
        limit: perPage,
        search,
        status: statusFilter,
      })
    );
  };


  const handleSort = (field: "lesson_name" | "time") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="relative">
      <ModalAddLesson
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddLesson}
        subjects={subjects}
        existingLessons={lessons}
      />

      <ModalUpdateLesson
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        onSubmit={handleUpdateLesson}
        lessonData={selectedLesson}
        existingLessons={lessons}
      />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">Danh sách bài học</h1>
          <div className="flex space-x-2">
            <select
              className="border rounded w-[259px] h-[44px] px-4 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Lọc theo trạng thái</option>
              <option value="completed">Đã hoàn thành</option>
              <option value="incomplete">Chưa hoàn thành</option>
            </select>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-[178px] h-[44px] text-sm"
            >
              <FiPlus className="mr-1" /> Thêm mới bài học
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm bài học theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[343px] h-[44px] px-4 border rounded text-sm"
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white shadow rounded">
          {loading ? (
            <div className="text-center py-6 text-gray-500 italic">
              Đang tải dữ liệu...
            </div>
          ) : (
            <table className="min-w-full text-sm text-left border-collapse table-fixed">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="w-[25px] px-5 py-3 text-center">
                    <img src={checkbox}  />
                  </th>
                  <th
                    className="px-4 py-3 cursor-pointer select-none w-[40%]"
                    onClick={() => handleSort("lesson_name")}
                  >
                    <div className="flex items-center gap-2">
                      Tên bài học
                      <img
                        src={arrow_down}
                        alt="sort"
                        className={`w-4 h-4 transition-transform ${
                          sortField === "lesson_name" && sortOrder === "desc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </th>
                  <th
                    className="px-4 py-3 cursor-pointer select-none w-[15%] text-center"
                    onClick={() => handleSort("time")}
                  >
                    <div className="flex items-center justify-center gap-2">
                      Thời lượng (phút)
                      <img
                        src={arrow_down}
                        alt="sort"
                        className={`w-4 h-4 transition-transform ${
                          sortField === "time" && sortOrder === "desc"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </div>
                  </th>
                  <th className="px-4 py-3 w-[25%] text-center">Trạng thái</th>
                  <th className="px-4 py-3 w-[15%] text-center">Chức năng</th>
                </tr>
              </thead>

              <tbody>
                {lessons.length > 0 ? (
                  lessons.map((lesson: any) => (
                    <tr
                      key={lesson.id}
                      className={`border-b ${
                        lesson.status === "completed" ? "bg-blue-200" : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-center w-[5%]">
                        <input
                          type="checkbox"
                          checked={lesson.status === "completed"}
                          onChange={() => handleToggleComplete(lesson)}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>

                      <td className="px-4 py-3 w-[40%] truncate">
                        {lesson.lesson_name}
                      </td>
                      <td className="px-4 py-3 w-[15%] text-center">
                        {lesson.time}
                      </td>
                      <td className="px-4 py-3 w-[25%] text-center">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                            lesson.status === "completed"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current" />
                          {lesson.status === "completed"
                            ? "Hoàn thành"
                            : "Chưa hoàn thành"}
                        </span>
                      </td>
                      <td className="px-4 py-3 w-[15%] text-center">
                        <div className="flex justify-center gap-4">
                          <button onClick={() => handleDeleteLesson(lesson.id)}>
                            <img
                              src={deletee}
                              alt="Xoá"
                              className="w-8 h-8"
                            />
                          </button>
                          <button onClick={() => handleEditLesson(lesson)}>
                            <img src={pen} alt="Sửa" className="w-8 h-8" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-gray-500 italic"
                    >
                      Không tìm thấy bài học nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
