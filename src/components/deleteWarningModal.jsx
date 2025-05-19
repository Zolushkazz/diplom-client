'use client'

import { Modal } from "@mui/material";


const ConfirmModal = ({ open, onClose, onConfirm, value = "Та хийсэн өөрчлөлтөө хадгалахгүй хаах гэж байна! Үнэхээр цонхыг хаах уу?" }) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ justifyContent: 'center', alignItems: 'center', flex: 1, display: 'flex' }}>
      <div className="flex flex-col justify-center gap-4 w-[280px] h-[160px] p-4 rounded-md bg-white ">
        <div className="flex flex-col gap-2 ">
          <h1 className="text-[16px]">Баталгаажуулах асуулт</h1>
          <p className="text-[13px]">{value}</p>
        </div>
        <div className="cursor-pointer flex items-center justify-end pr-2 gap-4 text-[#015197] font-semibold text-[13px]">
          <button onClick={onConfirm}>Тийм</button>
          <button onClick={onClose}>Үгүй</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;