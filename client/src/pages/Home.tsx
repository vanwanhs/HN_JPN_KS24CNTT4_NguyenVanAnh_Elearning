import React from "react";
import Favorites from "../image/Favorites.png"
import User from "../image/user.png"
import fb from "../image/Facebook.png"
import ins from "../image/instar.png"
import twitter from "../image/Twitter.png"
import tiktok from "../image/tiktok.png"
const courses = [
  {
    title: "HTML cơ bản",
    lessons: [
      "Session 01: Tổng quan về HTML",
      "Session 02: Thẻ inline và block",
      "Session 03: Thẻ hình ảnh",
      "Session 04: Thẻ chuyển trang",
      "Session 05: Thẻ Semantic",
    ],
  },
  {
    title: "CSS cơ bản",
    lessons: [
      "Session 01: Tổng quan về CSS",
      "Session 02: Những CSS vào trang Web",
      "Session 03: Position",
      "Session 04: Flexbox",
      "Session 05: Animation",
    ],
  },
  {
    title: "JavaScript cơ bản",
    lessons: [
      "Session 01: Tổng quan ngôn ngữ JavaScript",
      "Session 02: Khai báo biến",
      "Session 03: Câu lệnh điều kiện",
      "Session 04: Vòng lặp",
      "Session 05: Mảng",
    ],
  },
  {
    title: "Lập trình với React.js",
    lessons: [
      "Session 01: Tổng quan về React.js",
      "Session 02: Props, State, Event",
      "Session 03: React hook",
      "Session 04: UI Framework",
      "Session 05: React Router",
    ],
  },
  {
    title: "Lập trình với Java",
    lessons: [
      "Session 01: Tổng quan về ngôn ngữ Java",
      "Session 02: Khai báo biến",
      "Session 03: Câu lệnh điều kiện",
      "Session 04: Vòng lặp",
      "Session 05: Mảng",
    ],
  },
  {
    title: "Lập trình C",
    lessons: [],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white h-[88px] px-40 py-2 border-b border-gray-200 flex justify-between items-center">
        <input
          type="text"
          placeholder=" Tìm kiếm"
          className="w-[668px] px-4 py-2 border rounded-md text-sm"
        />
        <nav className="flex items-center gap-10 text-sm text-gray-700">
          <a href="#" className="text-black font-medium">
            Trang chủ
          </a>
          <a href="#">Môn học</a>
          <a href="#">Bài học</a>
          <button className="text-lg"></button>
           <img src={Favorites} alt="book" className="w-6 h-6" />
            <img src={User} alt="book" className="w-4 h-4" />
        </nav>
      </header>

      {/* Tabs */}
      <div className="px-40 py-3 border-b border-gray-200 text-sm text-gray-600">
        <div className="flex gap-6">
          <button className="font-semibold text-black border-b-2 border-black pb-2">
            Tất cả môn học
          </button>
          <button>Đã hoàn thành</button>
          <button>Chưa hoàn thành</button>
        </div>
      </div>

      {/* Course Grid */}
      <main className="px-40 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow">
        {courses.map((course, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold text-gray-800 mb-2">{course.title}</h2>
            {course.lessons.length > 0 ? (
              <ul className="text-sm text-gray-600 space-y-1 mb-2">
                {course.lessons.slice(0, 5).map((lesson, i) => (
                  <li key={i}>◉ {lesson}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic mb-4">
                Chưa có bài học nào
              </p>
            )}
            <button className="text-sm text-blue-500 hover:underline">
              Xem thêm
            </button>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-sm py-6 px-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-50">
          <div>
            <p>
              Chúng tôi cung cấp giải pháp học tập, giúp học sinh và sinh viên
              học tập tốt hơn và hiệu quả hơn.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img src={twitter} alt="book" className="w-4 h-4" />
            <img src={fb} alt="book" className="w-4 h-4" />
             <img src={tiktok} alt="book" className="w-4 h-4" />
            <img src={ins} alt="book" className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Danh mục</h4>
            <ul className="space-y-1">
              <li>Môn học</li>
              <li>Bài học</li>
              <li>Ghi chú</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Hỗ trợ khách hàng</h4>
            <ul className="space-y-1">
              <li>Tìm kiếm dịch vụ</li>
              <li>Điều khoản sử dụng</li>
              <li>Chính sách và điều khoản</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
