import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubjectsByPage,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../store/slices/paginationSubjectSlice";
import type { Subject } from "../utils/types";
import ModalAddSubject from "../components/ModalAddSubject";
import ModalUpdateSubject from "./ModalUpdateSubject";
import ModalConfirmDelete from "./ModalConfirmDelete";
import ToastSuccess from "./ToastSuccess";
import Pagination from "./Pagination";
import deletee from "../image/_Button base.png";
import pen from "../image/pen.png";
import arrow_down from "../image/arrow-down.png";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { DiTechcrunch } from "react-icons/di";

const statusLabel: Record<string, string> = {
  active: "Đang hoạt động",
  inactive: "Ngừng hoạt động",
};

const statusColor: Record<string, string> = {
  active: "text-green-600",
  inactive: "text-red-600",
};

export default function ManagementSubject() {
  const dispatch = useDispatch<any>();
  const {
    list: subjects,
    loading,
    totalPages,
  } = useSelector((state: any) => state.paginationSubjects);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOption, setSortOption] = useState<"name_asc" | "name_desc" | "">(
    ""
  );
  const [isAsc, setIsAsc] = useState<boolean | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);
  const [showToast, setShowToast] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;


  useEffect(() => {
    dispatch(
      fetchSubjectsByPage({
        page: currentPage,
        limit: perPage,
        search,
        status: statusFilter,
        // sort: "created_at_desc",
        sort: sortOption,
      })
    );
  }, [dispatch, currentPage, search, statusFilter, sortOption]);

  const handleAddSubject = async (newSubject: {subject_name: string;status: string;}) => {
    await dispatch(addSubject(newSubject));
    dispatch(
      fetchSubjectsByPage({
        page: currentPage,
        limit: perPage,
        search,
        status: statusFilter,
        sort: sortOption,
      })
    );
    setShowModal(false);
  };

  const handleUpdateSubject = async (updatedSubject: {
    id: number;
    subject_name: string;
    status: string;
  }) => {
    await dispatch(updateSubject(updatedSubject));
    dispatch(
      fetchSubjectsByPage({
        page: currentPage,
        limit: perPage,
        search,
        status: statusFilter,
        sort: sortOption,
      })
    );
    setShowUpdateModal(false);
  };

  const handleDeleteSubject = async () => {
    if (!subjectToDelete) return;

    try {
      const lessonsRes = await axios.get(
        `http://localhost:8080/lessons?subject_id=${subjectToDelete.id}`
      );
      const lessons = lessonsRes.data;
      await Promise.all(
        lessons.map((lesson: any) =>
          axios.delete(`http://localhost:8080/lessons/${lesson.id}`)
        )
      );

      await dispatch(deleteSubject(subjectToDelete.id));
      dispatch(
        fetchSubjectsByPage({
          page: currentPage,
          limit: perPage,
          search,
          status: statusFilter,
          sort: sortOption,
        })
      );
      setShowToast(true);
    } catch (error) {
      console.error(" Lỗi khi xoá môn học và bài học liên quan:", error);
    }
  };

  return (
    <div className="relative">
      <ModalAddSubject
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddSubject}
        subjects={subjects}
      />
      <ModalUpdateSubject
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdateSubject}
        subject={selectedSubject}
      />
      <ModalConfirmDelete
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteSubject}
        subjectName={subjectToDelete?.subject_name || ""}
      />
      {showToast && (
        <ToastSuccess
          message="Xoá môn học thành công"
          onClose={() => setShowToast(false)}
        />
      )}

      <main className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold">Danh sách môn học</h1>
          <div className="flex space-x-2">
            <select
              className="border rounded w-[259px] h-[44px] px-4 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Lọc theo trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="inactive">Ngừng hoạt động</option>
            </select>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-[178px] h-[44px] text-sm"
            >
              <FiPlus className="mr-1" /> Thêm mới môn học
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm môn học theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[343px] h-[44px] px-4 border rounded text-sm"
          />
        </div>

        <div className="flex-1 overflow-auto bg-white shadow rounded relative">
          {loading ? (
            <div className="text-center py-6 text-gray-500 italic">
              Đang tải dữ liệu...
            </div>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 border-b relative">
                <tr>
                  <th
                    className="px-4 py-3 flex items-center gap-1 cursor-pointer"
                    onClick={() => {
                      const newIsAsc = isAsc === null ? true : !isAsc;
                      setIsAsc(newIsAsc);
                      setSortOption(newIsAsc ? "name_asc" : "name_desc");
                    }}
                  >
                    Tên môn học
                    <img
                      src={arrow_down}
                      alt="menu"
                      className={`w-4 h-5 ml-1 transition-transform duration-200 ${
                        isAsc === null ? "" : isAsc ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-center">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {subjects.length > 0 ? (
                  subjects.map((subject: Subject) => (
                    <tr key={subject.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{subject.subject_name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                            statusColor[subject.status]
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current" />
                          {statusLabel[subject.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => {
                              setSubjectToDelete(subject);
                              setShowDeleteModal(true);
                            }}
                          >
                            <img src={deletee} alt="Xoá" className="w-8 h-8" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSubject(subject);
                              setShowUpdateModal(true);
                            }}
                          >
                            <img src={pen} alt="Sửa" className="w-8 h-8" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-gray-500 italic"
                    >
                      Không tìm thấy môn học nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
