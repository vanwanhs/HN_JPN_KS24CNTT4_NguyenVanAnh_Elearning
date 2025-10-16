import React from "react";

interface FilterTabsProps {
  filterStatus: "all" | "completed" | "incomplete";
  setFilterStatus: (status: "all" | "completed" | "incomplete") => void;
}

export default function FilterTabs({ filterStatus, setFilterStatus }: FilterTabsProps) {
  return (
    <div className="px-10 md:px-20 lg:px-32 xl:px-40 py-3 border-b border-gray-200 text-sm text-gray-600 bg-white">
      <div className="flex gap-6">
        {["all", "completed", "incomplete"].map((key) => (
          <button
            key={key}
            className={`pb-2 ${
              filterStatus === key
                ? "font-semibold text-black border-b-2 border-black"
                : ""
            }`}
            onClick={() => setFilterStatus(key as any)}
          >
            {key === "all"
              ? "Tất cả"
              : key === "completed"
              ? "Đã hoàn thành"
              : "Chưa hoàn thành"}
          </button>
        ))}
      </div>
    </div>
  );
}
