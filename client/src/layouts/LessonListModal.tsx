import React from "react";
import circle from "../image/circle-ok.png";
import type { Lesson, Subject } from "../utils/types";

interface LessonListModalProps {
  subject: Subject;
  lessons: Lesson[];
  onClose: () => void;
}

export default function LessonListModal({ subject, lessons, onClose }: LessonListModalProps) {
  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-5 w-[460px] max-h-[80vh] overflow-y-auto shadow-xl">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Danh sách bài học - {subject.subject_name}
        </h3>
        <ul className="text-sm text-gray-700 space-y-2 mb-4">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center gap-2">
              <img src={circle} alt="ok" className="w-4 h-4" />
              <span>{lesson.lesson_name}</span>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
