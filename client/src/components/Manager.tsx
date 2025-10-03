import { useState } from "react";
import deletee from "../image/_Button base.png";
import pen from "../image/pen.png";
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

const subjectsData = [
  { name: "Lập trình C", status: "active" },
  { name: "Lập trình Frontend với ReactJS", status: "inactive" },
];

const statusLabel = {
  active: "Đang hoạt động",
  inactive: "Ngừng hoạt động",
};

export default function Manager() {
  const [search, setSearch] = useState("");

  const filteredSubjects = subjectsData.filter((subject) =>
    subject.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white shadow-md p-4 space-y-4 flex-shrink-0">
        <div className="flex items-center gap-2 text-lg font-bold text-blue-600">
          <img src={book} alt="book" className="w-8 h-8" />
          Study Tracker
        </div>
        <div className="text-gray-500 text-sm">Quản lý tiến độ học tập</div>
        <nav className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-700 hover:text-blue-600 cursor-pointer gap-2">
            <img src={vector} alt="icon" className="w-4 h-4" />
            Thống kê
          </div>
          <div className="flex items-center text-sm text-blue-600 font-medium gap-2">
            <img src={noteBook} alt="icon" className="w-4 h-4" />
            Quản lý môn học
          </div>
          <div className="flex items-center text-sm text-gray-700 hover:text-blue-600 cursor-pointer gap-2">
            <img src={quanLi} alt="icon" className="w-4 h-4" />
            Quản lý bài học
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col p-6">
        {/* Header */}
        <header className="flex justify-between items-center h-[65px] px-6 mb-5 bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <button className="text-gray-400 hover:text-blue-600">
            <img src={icon_button} alt="menu" className="w-8 h-8" />
          </button>
          <div className="flex items-center space-x-3">
            <img src={bell} alt="bell" className="w-8 h-8 hover:text-blue-600 cursor-pointer" />
            <img src={question} alt="question" className="w-8 h-8 hover:text-blue-600 cursor-pointer" />
            <img src={setting} alt="setting" className="w-8 h-8 hover:text-blue-600 cursor-pointer" />
            <img src={avatar} alt="avatar" className="w-9 h-9 rounded-full border" />
          </div>
        </header>

        {/* Content + Pagination */}
        <div className="flex-1 flex flex-col">
          {/* Main Header */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <h1 className="text-xl font-semibold">Môn học</h1>
            <div className="flex space-x-2">
              <select className="border rounded w-[259px] h-[44px] px-4 text-sm">
                <option>Lọc theo trạng thái</option>
                <option>Đang hoạt động</option>
                <option>Ngừng hoạt động</option>
              </select>
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-[178px] h-[44px] text-sm">
                <FiPlus className="mr-1" /> Thêm mới môn học
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="flex justify-end mb-4 flex-shrink-0">
            <input
              type="text"
              placeholder="Tìm kiếm môn học theo tên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[343px] h-[44px] px-4 border rounded text-sm"
            />
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto bg-white shadow rounded">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-left flex items-center gap-2">
                    Tên môn học
                    <img src={arrow_down} alt="down" className="w-5 h-5" />
                  </th>
                  <th className="px-4 py-3 font-medium text-left w-[235px]">Trạng thái</th>
                  <th className="px-4 py-3 font-medium text-center w-[174px]">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.length > 0 ? (
                  filteredSubjects.map((subject, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{subject.name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                            subject.status === "active" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current" />
                          {statusLabel[subject.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-4">
                          <button>
                            <img src={deletee} alt="Xoá" className="w-8 h-8" />
                          </button>
                          <button>
                            <img src={pen} alt="Sửa" className="w-8 h-8" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-gray-500 italic">
                      Không tìm thấy môn học nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
        </div>
      </main>
    </div>
  );
}
