import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjectsByPage } from "../store/slices/paginationSubjectSlice";
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

const statusLabel: Record<string, string> = {
  active: "Đang hoạt động",
  inactive: "Ngừng hoạt động",
};

const statusColor: Record<string, string> = {
  active: "text-green-600",
  inactive: "text-red-600",
};

export default function ManagementSubject() {
  const dispatch = useDispatch();
  const { list: subjects, loading, totalPages } = useSelector(
    (state: any) => state.paginationSubjects
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // 🔹 Sort
  const [sortOption, setSortOption] = useState<"name_asc" | "name_desc" | "date_new" | "date_old" | "">("");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  // Load dữ liệu khi component mount hoặc params thay đổi
  useEffect(() => {
    dispatch(fetchSubjectsByPage({ page: currentPage, limit: perPage, search, status: statusFilter }));
  }, [dispatch, currentPage, search, statusFilter]);

  // Thêm
  const handleAddSubject = async (newSubject: { subject_name: string; status: string }) => {
    await axios.post("http://localhost:8080/subjects", {
      ...newSubject,
      created_at: new Date().toISOString(),
    });
    dispatch(fetchSubjectsByPage({ page: currentPage, limit: perPage, search, status: statusFilter }));
    setShowModal(false);
  };

  // Sửa
  const handleUpdateSubject = async (updatedSubject: { id: number; subject_name: string; status: string }) => {
    await axios.put(`http://localhost:8080/subjects/${updatedSubject.id}`, updatedSubject);
    dispatch(fetchSubjectsByPage({ page: currentPage, limit: perPage, search, status: statusFilter }));
    setShowUpdateModal(false);
  };

  // Xóa
  const handleDeleteSubject = async () => {
    if (subjectToDelete) {
      await axios.delete(`http://localhost:8080/subjects/${subjectToDelete.id}`);
      dispatch(fetchSubjectsByPage({ page: currentPage, limit: perPage, search, status: statusFilter }));
      setShowToast(true);
    }
  };

  // 🔹 Hàm sắp xếp local
  const sortedSubjects = [...subjects].sort((a, b) => {
    if (sortOption === "name_asc") return a.subject_name.localeCompare(b.subject_name);
    if (sortOption === "name_desc") return b.subject_name.localeCompare(a.subject_name);
    return 0;
  });

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
        {/* Header actions */}
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

        {/* Search */}
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Tìm kiếm môn học theo tên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[343px] h-[44px] px-4 border rounded text-sm"
          />
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto bg-white shadow rounded relative">
          {loading ? (
            <div className="text-center py-6 text-gray-500 italic">Đang tải dữ liệu...</div>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 border-b relative">
                <tr>
                  <th className="px-4 py-3 flex items-center gap-1 relative">
                    Tên môn học
                    <img
                      src={arrow_down}
                      alt="menu"
                      className="w-4 h-5 cursor-pointer"
                      onClick={() => setShowSortMenu((prev) => !prev)}
                    />
                    {/* Menu sắp xếp */}
                    {showSortMenu && (
                      <div className="absolute left-24 top-10 bg-white border rounded shadow-md text-sm z-10 w-48">
                        <button
                          onClick={() => {
                            setSortOption("name_asc");
                            setShowSortMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Sắp xếp theo tên (A → Z)
                        </button>
                        <button
                          onClick={() => {
                            setSortOption("name_desc");
                            setShowSortMenu(false);
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Sắp xếp theo tên (Z → A)
                        </button>
                      </div>
                    )}
                  </th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-center">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {sortedSubjects.length > 0 ? (
                  sortedSubjects.map((subject: Subject) => (
                    <tr key={subject.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{subject.subject_name}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusColor[subject.status]}`}
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
                    <td colSpan={3} className="px-4 py-6 text-center text-gray-500 italic">
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
