import React from "react";

interface LogoutModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onCancel, onConfirm }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[350px] shadow-lg text-center">
        <h3 className="text-lg font-semibold mb-3">Xác nhận đăng xuất</h3>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
