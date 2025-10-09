import { useEffect } from "react";

interface ToastSuccessProps {
  message: string;
  onClose: () => void;
}

export default function ToastSuccess({ message, onClose }: ToastSuccessProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-[9999]">
      <div className="bg-[#1E293B] text-white px-4 py-3 rounded-md shadow flex items-center gap-3 min-w-[250px]">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        <div className="flex-1 text-sm">
          <strong>Thành công</strong>
          <div className="text-xs">{message}</div>
        </div>
        <button onClick={onClose} className="text-white text-xs hover:text-gray-300">
          ✕
        </button>
      </div>
    </div>
  );
}