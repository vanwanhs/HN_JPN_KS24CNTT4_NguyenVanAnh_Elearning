import React from "react";
import circle from "../image/circle-ok.png";
import type { Lesson, Subject } from "../utils/types";

interface SubjectCardProps {
  subject: Subject;
  lessons: Lesson[];
  onViewMore: () => void;
}

export default function SubjectCard({ subject, lessons, onViewMore }: SubjectCardProps) {
  return (
    <div className="border rounded-lg p-3 shadow-sm bg-white flex flex-col justify-between h-[200px]">
      <div>
        <h2 className="font-semibold text-gray-800 mb-2 line-clamp-1 text-[15px]">
          {subject.subject_name}
        </h2>

        {lessons.length > 0 ? (
          <ul className="text-xs text-gray-600 space-y-1 mb-2">
            {lessons.slice(0, 4).map((lesson) => (
              <li key={lesson.id} className="flex items-center space-x-2">
                <img src={circle} alt="ok" className="w-3.5 h-3.5" />
                <span className="truncate">{lesson.lesson_name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-400 italic mb-2">
            Chưa có bài học nào
          </p>
        )}
      </div>

      {lessons.length > 4 && (
        <button
          onClick={onViewMore}
          className="text-xs text-blue-500 hover:underline mt-auto"
        >
          Xem thêm
        </button>
      )}
    </div>
  );
}
