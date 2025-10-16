import { useState } from "react";
import ReactDOM from "react-dom";

interface ModalAddLessonProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lesson: {
    lesson_name: string;
    time: number;
    status: string;
    subject_id: number; // ✅ giữ kiểu number
  }) => void;
  subjects: { id: number; subject_name: string }[];
  existingLessons: {
    lesson_name: string;
    subject_id?: string | number;
    subjectId?: string | number;
  }[];
}

export default function ModalAddLesson({
  isOpen,
  onClose,
  onSubmit,
  subjects,
  existingLessons,
}: ModalAddLessonProps) {
  const [lessonName, setLessonName] = useState("");
  const [time, setTime] = useState<number>(0);
  const [status, setStatus] = useState("incomplete");
  const [subjectId, setSubjectId] = useState<number | "">("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmedName = lessonName.trim();

    // Kiểm tra nhập thiếu
    if (!trimmedName) {
      setError("Tên bài học không được để trống");
      return;
    }
    if (!subjectId) {
      setError("Vui lòng chọn môn học");
      return;
    }
    if (!time || time <= 0) {
      setError("Thời lượng phải lớn hơn 0");
      return;
    }

    const normalizedSubjectId = Number(subjectId);

    const isDuplicate = existingLessons.some(
      (lesson) =>
        Number(lesson.subject_id || lesson.subjectId) === normalizedSubjectId &&
        lesson.lesson_name.trim().toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      setError("Bài học này đã tồn tại trong môn học đã chọn");
      return;
    }

    //  Gửi đúng kiểu number cho subject_id
    onSubmit({
      lesson_name: trimmedName,
      time,
      status,
      subject_id: normalizedSubjectId,
    });

    // Reset form
    setLessonName("");
    setTime(0);
    setStatus("incomplete");
    setSubjectId("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
      <div className="bg-white w-[480px] rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">Thêm mới bài học</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Chọn môn học
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(Number(e.target.value))} // ✅ ép kiểu về number
            className="w-full border px-3 py-2 rounded border-gray-300"
          >
            <option value="">-- Chọn môn học --</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.subject_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Tên bài học
          </label>
          <input
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            className="w-full border px-3 py-2 rounded border-gray-300"
            placeholder="Nhập tên bài học..."
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            Thời lượng (phút)
          </label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded border-gray-300"
            placeholder="VD: 60"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
