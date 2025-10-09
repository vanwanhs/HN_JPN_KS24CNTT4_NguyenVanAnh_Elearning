import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLessons } from "../store/slices/lessonSlice";
import deletee from "../image/_Button base.png";
import pen from "../image/pen.png";
import checkBox from "../image/_BaseCheckboxStates.png";
import vector from "../image/Vector.png";
import quanLi from "../image/quanLi.png";
import book from "../image/book.png";
import icon_button from "../image/Icon button.png";
import bell from "../image/bell.png";
import question from "../image/Question mark circle.png";
import setting from "../image/setting.png";
import avatar from "../image/avatar.jpg";
import arrow_down from "../image/arrow-down.png";
import noteBook from "../image/noteBook.png";
import { FiPlus } from "react-icons/fi";

export default function ManagementLesson() {
  const dispatch: any = useDispatch();
  const { list: lessons, loading } = useSelector((state: any) => state.lesson);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllLessons());
  }, [dispatch]);

  const filteredLessons = lessons.filter((lesson: any) =>
    lesson.lesson_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-semibold">Danh sách bài học</h1>
            <div className="flex space-x-2">
              <select className="border rounded w-[259px] h-[44px] px-4 text-sm">
                <option>Lọc theo trạng thái</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="incomplete">Chưa hoàn thành</option>
              </select>
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-[178px] h-[44px] text-sm">
                <FiPlus className="mr-1" /> Thêm mới bài học
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Tìm kiếm bài học theo tên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[343px] h-[44px] px-4 border rounded text-sm"
            />
          </div>

          <div className="flex-1 overflow-auto bg-white shadow rounded">
            {loading ? (
              <div className="text-center py-6 text-gray-500 italic">Đang tải dữ liệu...</div>
            ) : (
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3"><img src={checkBox}/></th>
                    <th className="px-4 py-3">Tên bài học</th>
                    <th className="px-4 py-3">Thời lượng (phút)</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-center">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLessons.length > 0 ? (
                    filteredLessons.map((lesson: any) => (
                      <tr key={lesson.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3"><input type="checkbox" /></td>
                        <td className="px-4 py-3">{lesson.lesson_name}</td>
                        <td className="px-4 py-3">{lesson.time}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${lesson.status === "completed" ? "text-green-600" : "text-red-600"}`}>
                            <span className="w-2 h-2 rounded-full bg-current" />
                            {lesson.status === "completed" ? "Hoàn thành" : "Chưa hoàn thành"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-4">
                            <button><img src={deletee} alt="Xoá" className="w-8 h-8" /></button>
                            <button><img src={pen} alt="Sửa" className="w-8 h-8" /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-gray-500 italic">
                        Không tìm thấy bài học nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center space-x-1 mt-4 pt-4 flex-shrink-0">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">←</button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`px-3 py-1 border rounded hover:bg-blue-100 ${
                  n === 3 ? "bg-blue-600 text-white" : ""
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-2">...</span>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">20</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">→</button>
          </div>
      </main>
    </div>
  );
}
