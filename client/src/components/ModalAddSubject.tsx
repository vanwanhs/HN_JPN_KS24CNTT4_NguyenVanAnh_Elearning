import { useState } from "react";
import ReactDOM from "react-dom";

interface ModalAddSubjectProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subject: { subject_name: string; status: string }) => void;
  subjects: { subject_name: string }[];
}


export default function ModalAddSubject({ isOpen, onClose, onSubmit, subjects }: ModalAddSubjectProps) {
  const [subjectName, setSubjectName] = useState("");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");

  const handleSubmit = () => {
  if (!subjectName.trim()) {
    setError("Tên môn học không được để trống");
    return;
  }

  const isDuplicate = subjects.some(
    (s) => s.subject_name.toLowerCase().trim() === subjectName.toLowerCase().trim()
  );

  if (isDuplicate) {
    setError("Môn học này đã tồn tại");
    return;
  }

  onSubmit({ subject_name: subjectName.trim(), status });
  setSubjectName("");
  setStatus("active");
  setError("");
  onClose();
};


  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center --shadow-3xl: 0 35px 35px rgba(0, 0, 0, 0.25) justify-center ">


      <div className="bg-white w-[480px] rounded-lg shadow-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold mb-4">Thêm mới môn học</h2>

        {/* Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên môn học</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => {
              setSubjectName(e.target.value);
              setError("");
            }}
            className={`w-full border px-3 py-2 rounded ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập tên môn học..."
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="active"
                checked={status === "active"}
                onChange={(e) => setStatus(e.target.value)}
                className="mr-2"
              />
              Đang hoạt động
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="inactive"
                checked={status === "inactive"}
                onChange={(e) => setStatus(e.target.value)}
                className="mr-2"
              />
              Ngừng hoạt động
            </label>
          </div>
        </div>

        {/* Buttons */}
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
            Thêm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
