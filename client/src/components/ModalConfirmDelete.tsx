import ReactDOM from "react-dom";
interface ModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  subjectName: string;
}

export default function ModalConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  subjectName,
}: ModalConfirmDeleteProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6 relative">
        <h2 className="text-lg font-semibold text-red-600 flex items-center mb-2">
          ❗ Xác nhận
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          Bạn có chắc chắn muốn xoá môn học <b>{subjectName}</b>?
          Hành động này không thể hoàn tác.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Huỷ
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
