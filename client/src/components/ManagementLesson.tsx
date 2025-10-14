import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLessons } from "../store/slices/lessonSlice";
import deletee from "../image/_Button base.png";
import pen from "../image/pen.png";
import checkBox from "../image/_BaseCheckboxStates.png";
import { FiPlus } from "react-icons/fi";
import Pagination from "./Pagination";
import axios from "axios";
import ModalAddLesson from "./ModalAddLesson";
import ModalUpdateLesson from "./ModalUpdateLesson";
import arrow_down from "../image/arrow-down.png";

export default function ManagementLesson() {
  const dispatch: any = useDispatch();
  const {
    list: lessons,
    loading,
    totalPages,
  } = useSelector((state: any) => state.lesson);

  // State lọc, tìm kiếm, phân trang
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  // Modal thêm và sửa
  const [showModal, setShowModal] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  // Danh sách môn học
  const [subjects, setSubjects] = useState<any[]>([]);

  // LẤY DANH SÁCH MÔN HỌC
  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:8080/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.error(" Lỗi khi lấy danh sách môn học:", error);
    }
  };

  //  LẤY DANH SÁCH BÀI HỌC
  useEffect(() => {
    dispatch(
      getAllLessons({
        page: currentPage,
        limit: perPage,
        search,
        status: statusFilter,
      })
    );
  }, [dispatch, currentPage, search, statusFilter]);

  // GỌI MÔN HỌC MỘT LẦN
  useEffect(() => {
    fetchSubjects();
  }, []);

  //  THÊM BÀI HỌC
  const handleAddLesson = async (newLesson: {
    lesson_name: string;
    time: number;
    status: string;
    subject_id: string;
  }) => {
    try {
      await axios.post("http://localhost:8080/lessons", {
        ...newLesson,
        created_at: new Date().toISOString(),
      });
      dispatch(
        getAllLessons({
          page: currentPage,
          limit: perPage,
          search,
          status: statusFilter,
        })
      );
      setShowModal(false);
      alert(" Thêm bài học thành công!");
    } catch (error) {
      console.error(" Lỗi khi thêm bài học:", error);
      alert("Thêm bài học thất bại!");
    }
  };

  //XOÁ BÀI HỌC
  const handleDeleteLesson = async (id: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xoá bài học này không?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:8080/lessons/${id}`);
      dispatch(
        getAllLessons({
          page: currentPage,
          limit: perPage,
          search,
          status: statusFilter,
        })
      );
      alert(" Xoá bài học thành công!");
    } catch (error) {
      console.error(" Lỗi khi xoá bài học:", error);
      alert(" Xoá bài học thất bại!");
    }
  };

  //  SỬA BÀI HỌC
  const handleEditLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setIsUpdateOpen(true);
  };

  const handleUpdateLesson = async (updatedLesson: any) => {
    try {
      await axios.put(
        `http://localhost:8080/lessons/${updatedLesson.id}`,
        updatedLesson
      );
      dispatch(
        getAllLessons({
          page: currentPage,
          limit: perPage,
          search,
          status: statusFilter,
        })
      );
      setIsUpdateOpen(false);
      alert(" Cập nhật bài học thành công!");
    } catch (error) {
      console.error(" Lỗi khi cập nhật bài học:", error);
      alert(" Cập nhật thất bại!");
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
      />

      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-semibold">Danh sách bài học</h1>
            <div className="flex space-x-2">
              {/* Lọc theo trạng thái */}
              <select
                className="border rounded w-[259px] h-[44px] px-4 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Lọc theo trạng thái</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="incomplete">Chưa hoàn thành</option>
              </select>

              {/* Nút thêm mới */}
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-[178px] h-[44px] text-sm"
              >
                <FiPlus className="mr-1" /> Thêm mới bài học
              </button>
            </div>
          </div>

          {/* Ô tìm kiếm */}
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm bài học theo tên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[343px] h-[44px] px-4 border rounded text-sm"
            />
          </div>

          {/* Bảng danh sách */}
          <div className="flex-1 overflow-auto bg-white shadow rounded">
            {loading ? (
              <div className="text-center py-6 text-gray-500 italic">
                Đang tải dữ liệu...
              </div>
            ) : (
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    {/* Checkbox tiêu đề */}
                    <th className="w-[50px] px-4 py-3 text-center align-middle">
                      <input type="checkbox" className="mx-auto w-4 h-4" />
                    </th>

                    {/* Tên bài học */}
                    <th className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span>Tên bài học</span>
                        <img
                          src={arrow_down}
                          alt="sort"
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => handleSort("lesson_name")}
                        />
                      </div>
                    </th>

                    {/* Thời lượng */}
                    <th className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span>Thời lượng (phút)</span>
                        <img
                          src={arrow_down}
                          alt="sort"
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => handleSort("time")}
                        />
                      </div>
                    </th>

                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-center">Chức năng</th>
                  </tr>
                </thead>

                <tbody>
                  {lessons.length > 0 ? (
                    lessons.map((lesson: any) => (
                      <tr key={lesson.id} className="border-b hover:bg-gray-50">
                        {/* Checkbox từng dòng */}
                        <td className="w-[50px] px-4 py-3 text-center align-middle">
                          <input type="checkbox" className="mx-auto w-4 h-4" />
                        </td>

                        <td className="px-4 py-3 align-middle">
                          {lesson.lesson_name}
                        </td>
                        <td className="px-4 py-3 align-middle">
                          {lesson.time}
                        </td>
                        <td className="px-4 py-3 align-middle">
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

                        <td className="px-4 py-3 text-center align-middle">
                          <div className="flex justify-center gap-4">
                            <button
                              onClick={() => handleDeleteLesson(lesson.id)}
                            >
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
                        colSpan={6}
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
        </div>

        {/* Phân trang */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}
