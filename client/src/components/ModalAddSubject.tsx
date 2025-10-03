import React from 'react'
import Close from '../image/close.png'
export default function ModalAddSubject() {
  return (
    <div>
      <div className='flex text-right pr-40'>
        <p>Thêm mới môn học</p>
        <img src={Close} alt="book" className="w-8 h-8" />
      </div>
      <p>Tên môn học</p>
      <input type="text" />
      <div className='flex gap-3'>
        <p>Trạng thái hoạt động</p>
        <input type="radio" />
        <p>Trạng thái ngừng hoạt động</p>
        <input type="radio" />
      </div>
    </div>
  )
}
