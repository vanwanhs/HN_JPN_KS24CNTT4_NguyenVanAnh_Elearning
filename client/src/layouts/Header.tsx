import React from "react";
import Favorites from "../image/Favorites.png";
import User from "../image/user.png";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onLogoutClick: () => void;
}

export default function Header({ searchTerm, setSearchTerm, onLogoutClick }: HeaderProps) {
  return (
    <header className="bg-white h-[72px] px-10 md:px-20 lg:px-32 xl:px-40 border-b border-gray-200 flex justify-between items-center">
      <input
        type="text"
        placeholder="Tìm kiếm môn học"
        className="w-[320px] md:w-[480px] lg:w-[600px] xl:w-[700px] px-3 py-1.5 border rounded-md text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <nav className="flex items-center gap-5 md:gap-8 text-sm text-gray-700">
        <a href="#" className="text-black font-medium">
          Trang chủ
        </a>
        <a href="#">Môn học</a>
        <a href="#">Bài học</a>
        <img src={Favorites} alt="book" className="w-5 h-5" />
        <img
          src={User}
          alt="user"
          className="w-6 h-6 cursor-pointer hover:opacity-70 transition"
          onClick={onLogoutClick}
        />
      </nav>
    </header>
  );
}
