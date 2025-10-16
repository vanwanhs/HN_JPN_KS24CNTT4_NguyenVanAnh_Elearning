import React from 'react'
import fb from "../image/Facebook.png";
import ins from "../image/instar.png";
import twitter from "../image/Twitter.png";
import tiktok from "../image/tiktok.png";
export default function Footer() {
  return (
    <div className="bg-black text-white text-sm py-6 px-40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p>
              Chúng tôi cung cấp giải pháp học tập, giúp học sinh và sinh viên
              học tập tốt hơn và hiệu quả hơn.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <img src={twitter} alt="Twitter" className="w-4 h-4" />
              <img src={fb} alt="Facebook" className="w-4 h-4" />
              <img src={tiktok} alt="Tiktok" className="w-4 h-4" />
              <img src={ins} alt="Instagram" className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Danh mục</h4>
            <ul className="space-y-1">
              <li>Môn học</li>
              <li>Bài học</li>
              <li>Ghi chú</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Hỗ trợ khách hàng</h4>
            <ul className="space-y-1">
              <li>Tìm kiếm dịch vụ</li>
              <li>Điều khoản sử dụng</li>
              <li>Chính sách và điều khoản</li>
            </ul>
          </div>
        </div>
    </div>
  )
}
