import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import type { Subject } from "../utils/types";

interface ModalUpdateLessonProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lesson: { id: number; lesson_name: string; subjectId: number; time: number; status: string }) => void;
  lessonData: {
    id: number;
    lesson_name: string;
    subjectId: number;
    time: number;
    status: string;
  } | null;
}

export default function ModalUpdateLesson({
  isOpen,
  onClose,
  onSubmit,
  lessonData,
}: ModalUpdateLessonProps) {
  const [lessonName, setLessonName] = useState("");
  const [subjectId, setSubjectId] = useState<number | "">("");
  const [time, setTime] = useState<number | "">("");
  const [status, setStatus] = useState("active");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState("");

  //  Lấy danh sách môn học từ db.json
  useEffect(() => {
    axios.get("http://localhost:8080/subjects").then((res) => setSubjects(res.data));
  }, []);

  //  Khi mở modal, điền sẵn thông tin bài học
  useEffect(() => {
    if (lessonData) {
      setLessonName(lessonData.lesson_name);
      setSubjectId(lessonData.subjectId);
      setTime(lessonData.time);
      setStatus(lessonData.status);
    }
  }, [lessonData]);

  const handleSubmit = () => {
    if (!lessonName.trim()) {
      setError("Tên bài học không được để trống");
      return;
    }
    if (!subjectId) {
      setError("Vui lòng chọn môn học");
      return;
    }
    if (!time || time <= 0) {
      setError("Thời gian phải lớn hơn 0");
      return;
    }

    onSubmit({
      id: lessonData?.id || 0,
      lesson_name: lessonName.trim(),
      subjectId: Number(subjectId),
      time: Number(time),
      status,
    });

    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="bg-white w-[480px] rounded-lg shadow-lg p-6 relative animate-fadeIn">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">Cập nhật bài học</h2>

        {/* Tên bài học */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tên bài học
          </label>
          <input
            type="text"
            value={lessonName}
            onChange={(e) => {
              setLessonName(e.target.value);
              setError("");
            }}
            className={`w-full border px-3 py-2 rounded ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập tên bài học..."
          />
        </div>

        {/* Môn học */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Môn học
          </label>
          <select
            value={subjectId}
            onChange={(e) => {
              setSubjectId(Number(e.target.value));
              setError("");
            }}
            className={`w-full border px-3 py-2 rounded ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">-- Chọn môn học --</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.subject_name}
              </option>
            ))}
          </select>
        </div>

        {/* Thời gian */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thời lượng (phút)
          </label>
          <input
            type="number"
            value={time}
            onChange={(e) => {
              setTime(Number(e.target.value));
              setError("");
            }}
            className={`w-full border px-3 py-2 rounded ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập thời lượng bài học..."
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Nút hành động */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
