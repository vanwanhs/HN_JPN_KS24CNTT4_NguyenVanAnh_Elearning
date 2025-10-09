import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Subject, Lesson } from "../utils/types";
import Favorites from "../image/Favorites.png";
import circle from "../image/circle-ok.png";
import User from "../image/user.png";
import fb from "../image/Facebook.png";
import ins from "../image/instar.png";
import twitter from "../image/Twitter.png";
import tiktok from "../image/tiktok.png";


export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "incomplete">("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subjectRes, lessonRes] = await Promise.all([
          axios.get<Subject[]>("http://localhost:8080/subjects"),
          axios.get<Lesson[]>("http://localhost:8080/lessons"),
        ]);
        setSubjects(subjectRes.data);
        setLessons(lessonRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const filteredSubjects = subjects.filter((subject) => {
    const subjectLessons = lessons.filter(lesson => lesson.subject_id === subject.id);
    const isCompleted = subjectLessons.length > 0 && subjectLessons.every(lesson => lesson.status === "completed");

    const matchesSearch = subject.subject_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && isCompleted) ||
      (filterStatus === "incomplete" && !isCompleted);

    return matchesSearch && matchesStatus;
  });

  const courses = filteredSubjects.map((subject) => ({
    title: subject.subject_name,
    lessons: lessons
      .filter((lesson) => lesson.subject_id === subject.id)
      .slice(0, 5)
      .map((lesson) => lesson.lesson_name),
  }));

  if (loading) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white h-[88px] px-40 py-2 border-b border-gray-200 flex justify-between items-center">
        <input
          type="text"
          placeholder="Tìm kiếm môn học"
          className="w-[668px] px-4 py-2 border rounded-md text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <nav className="flex items-center gap-10 text-sm text-gray-700">
          <a href="#" className="text-black font-medium">Trang chủ</a>
          <a href="#">Môn học</a>
          <a href="#">Bài học</a>
          <img src={Favorites} alt="book" className="w-6 h-6" />
          <img src={User} alt="book" className="w-4 h-4" />
        </nav>
      </header>

      {/* Tabs - Bộ lọc trạng thái bài học */}
      <div className="px-40 py-3 border-b border-gray-200 text-sm text-gray-600">
        <div className="flex gap-6">
          <button
            className={`pb-2 ${filterStatus === "all" ? "font-semibold text-black border-b-2 border-black" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            Tất cả môn học
          </button>
          <button
            className={`pb-2 ${filterStatus === "completed" ? "font-semibold text-black border-b-2 border-black" : ""}`}
            onClick={() => setFilterStatus("completed")}
          >
            Đã hoàn thành
          </button>
          <button
            className={`pb-2 ${filterStatus === "incomplete" ? "font-semibold text-black border-b-2 border-black" : ""}`}
            onClick={() => setFilterStatus("incomplete")}
          >
            Chưa hoàn thành
          </button>
        </div>
      </div>

      {/* Course Grid */}
      <main className="px-40 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-grow">
        {courses.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">Không tìm thấy môn học phù hợp.</p>
        ) : (
          courses.map((course, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold text-gray-800 mb-2">{course.title}</h2>
              {course.lessons.length > 0 ? (
                <ul className="text-sm text-gray-600 space-y-1 mb-2">
                  {course.lessons.map((lesson, i) => (
                   <li key={i} className="flex items-center space-x-2">
  <img src={circle} alt="Twitter" className="w-4 h-4" />
  <span>{lesson}</span>
</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic mb-4">Chưa có bài học nào</p>
              )}
              <button className="text-sm text-blue-500 hover:underline">
                Xem thêm
              </button>
            </div>
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-sm py-6 px-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p>
              Chúng tôi cung cấp giải pháp học tập, giúp học sinh và sinh viên
              học tập tốt hơn và hiệu quả hơn.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img src={twitter} alt="Twitter" className="w-4 h-4" />
              <img src={fb} alt="Facebook" className="w-4 h-4" />
              <img src={tiktok} alt="Tiktok" className="w-4 h-4" />
              <img src={ins} alt="Instagram" className="w-4 h-4" />
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