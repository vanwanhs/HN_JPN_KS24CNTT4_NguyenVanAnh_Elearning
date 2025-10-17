import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllSubjects, setPage } from "../store/slices/homeSlice";
import Header from "../layouts/Header";
import FilterTabs from "../layouts/FilterTabs";
import SubjectCard from "../layouts/SubjectCard";
import LessonListModal from "../layouts/LessonListModal";
import LogoutModal from "../layouts/LogoutModal";
import Footer from "../layouts/Footer";
import Pagination from "../components/Pagination";
import type { Lesson } from "../utils/types";

export default function Home() {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { subjects, loading, currentPage, totalPages, perPage } = useSelector(
    (state: any) => state.home
  );

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "completed" | "incomplete"
  >("all");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null);

  useEffect(() => {
    dispatch(getAllSubjects({ page: currentPage, limit: perPage }));
  }, [dispatch, currentPage, perPage]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get<Lesson[]>("http://localhost:8080/lessons");
        setLessons(res.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchLessons();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  if (loading)
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;

  const filteredSubjects = subjects.filter((subject) => {
    const subjectLessons = lessons.filter(
      (lesson) => Number(lesson.subject_id) === Number(subject.id)
    );
    const isCompleted =
      subjectLessons.length > 0 &&
      subjectLessons.every((l) => l.status === "completed");
    const matchesSearch = subject.subject_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && isCompleted) ||
      (filterStatus === "incomplete" && !isCompleted);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onLogoutClick={() => setShowLogoutModal(true)}
      />
      <FilterTabs
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <main className="px-8 md:px-16 lg:px-28 xl:px-36 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 flex-grow">
        {filteredSubjects.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy môn học phù hợp.
          </p>
        ) : (
          filteredSubjects.map((subject) => {
            const subjectLessons = lessons.filter(
              (lesson) => Number(lesson.subject_id) === Number(subject.id)
            );
            return (
              <SubjectCard
                key={subject.id}
                subject={subject}
                lessons={subjectLessons}
                onViewMore={() => setSelectedSubject(subject)}
              />
            );
          })
        )}
      </main>

      {/* Phân trang */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {selectedSubject && (
        <LessonListModal
          subject={selectedSubject}
          lessons={lessons.filter(
            (l) => Number(l.subject_id) === Number(selectedSubject.id)
          )}
          onClose={() => setSelectedSubject(null)}
        />
      )}

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}

      <Footer />
    </div>
  );
}
