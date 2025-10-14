// src/pages/Manager.tsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import vector from "../image/Vector.png";
import quanLi from "../image/quanLi.png";
import noteBook from "../image/noteBook.png";
import book from "../image/book.png";
import icon_button from "../image/Icon button.png";
import bell from "../image/bell.png";
import question from "../image/Question mark circle.png";
import setting from "../image/setting.png";
import avatar from "../image/avatar.jpg";

export default function Manager() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white shadow-md p-4 space-y-4 flex-shrink-0">
        <div className="flex items-center gap-2 text-lg font-bold text-blue-600 cursor-pointer">
          <img src={book} alt="book" className="w-8 h-8" />
          Study Tracker
        </div>
        <div className="text-gray-500 text-sm">Quản lý tiến độ học tập</div>
        <nav className="mt-4 space-y-2">
          <div
            className={`flex items-center text-sm cursor-pointer gap-2 ${
              isActive("/manager/statistics") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => navigate("/manager/statistics")}
          >
            <img src={vector} alt="icon" className="w-4 h-4" />
            Thống kê
          </div>
          <div
            className={`flex items-center text-sm cursor-pointer gap-2 ${
              isActive("/manager/subjects") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => navigate("/manager/subjects")}
          >
            <img src={noteBook} alt="icon" className="w-4 h-4" />
            Quản lý môn học
          </div>
          <div
            className={`flex items-center text-sm cursor-pointer gap-2 ${
              isActive("/manager/lessons") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => navigate("/manager/lessons")}
          >
            <img src={quanLi} alt="icon" className="w-4 h-4" />
            Quản lý bài học
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col p-6">
        {/* Header */}
        <header className="flex justify-between items-center h-[65px] px-6 mb-5 bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <button className="text-gray-400 hover:text-blue-600">
            <img src={icon_button} alt="menu" className="w-8 h-8" />
          </button>
          <div className="flex items-center space-x-3">
            <img src={bell} alt="bell" className="w-8 h-8" />
            <img src={question} alt="question" className="w-8 h-8" />
            <img src={setting} alt="setting" className="w-8 h-8" />
            <img src={avatar} alt="avatar" className="w-9 h-9 rounded-full border" />
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
