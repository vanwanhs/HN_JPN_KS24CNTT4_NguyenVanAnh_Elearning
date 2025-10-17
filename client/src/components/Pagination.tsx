import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pagesToShow = Array.from({ length: Math.min(6, totalPages) }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-4 space-x-1">
      <button
        className="px-3 py-1 border rounded hover:bg-gray-100"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      > 
        ←
      </button>

      {pagesToShow.map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`px-3 py-1 border rounded hover:bg-gray-100 ${n === currentPage ? "bg-blue-600 text-white" : ""}`}
        >
          {n}
        </button>
      ))}

      {totalPages > 6 && <span className="px-2">...</span>}

      {totalPages > 6 && (
        <button
          className="px-3 py-1 border rounded hover:bg-gray-100"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      <button
        className="px-3 py-1 border rounded hover:bg-gray-100"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
}