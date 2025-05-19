'use client'

import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { Add, DeleteOutline } from "@mui/icons-material";
import { AddRequest } from "./modal/addRequest";
import { requestAPI } from "../api";
import ConfirmModal from "../deleteWarningModal";
import { useRouter } from "next/router";

const Requests = () => {
  const [search, setSearch] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteRow, setDeleteRow] = useState(false);
  const [rowIdToDelete, setRowIdToDelete] = useState(null);
  const [requests, setGetRequests] = useState([]);
  const [error, setError] = useState(null); 
  const [editData, setEditData] = useState(null);
  const router = useRouter(); // Fixed destructuring

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getRequests(); 
      setGetRequests(response.data);
    } catch (error) {
      setError("Error fetching request data"); 
    } 
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleEdit = (request) => {
    setEditData(request);
    setOpenAddModal(true); 
  };

  const handleAddNew = () => {
    setEditData(null); 
    setOpenAddModal(true); 
  };

  const handleDelete = async (id) => {
    try {
      const response = await requestAPI.deleteRequest(id);
      if(response.status === 200){
        fetchRequests();
        setDeleteRow(false);
        setRowIdToDelete(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Алдаа гарлаа. Дахин оролдоно уу.');
    }
  };

  const handleRowClick = () => {
    router.push(`/requestsMore`);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg h-[93%] w-full">     
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
              <h2 className="font-semibold text-[13px]">Хүсэлтүүд</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded px-2">
              <TextField
                placeholder="Хайлт"
                variant="standard"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="h-[30px]"
              />
              <SearchIcon />
            </div>
            <Add onClick={handleAddNew} className="cursor-pointer" sx={{color:"gray"}} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead className="text-[#015197]">
              <tr>
                <th className="border-b p-2">Хүлээн авах ажилтан</th>
                <th className="border-b p-2">Бүртгэсэн ажилтан</th>
                <th className="border-b p-2">Хүсэлт бүртгэсэн хэлтэс</th>
                <th className="border-b p-2">Хүсэлтийн төрөл</th>
                <th className="border-b p-2">Товч тайлбар</th>
                <th className="border-b p-2">Бүртгэсэн огноо</th>
                <th className="border-b p-2">Хариу авах огноо</th>
                <th className="border-b p-2">Үйлдэл</th>
              </tr>
            </thead>
              <tbody className="cursor-pointer">
              {requests.map((request, index) => (
                <tr key={index} className="" onClick={handleRowClick} >
                  <td className="border-b p-2 text-center">{request.name}</td>
                  <td className="border-b p-2 text-center">{request.registeredEmployee}</td>
                  <td className="border-b p-2 text-center">{request.department}</td>
                  <td className="border-b p-2 text-center">{request.description}</td>
                  <td className="border-b p-2 text-center break-words">{request.notes}</td>
                  <td className="border-b p-2 text-center">{request.createdAt.slice(0, 10)}</td>
                  <td className="border-b p-2 text-center">{request.startDate}</td>
                  <td className="border-b p-2 flex items-center">
                    <EditOutlinedIcon 
                      sx={{color: "gray", cursor: "pointer"}} 
                      onClick={() => handleEdit(request.id)} 
                    />
                    <DeleteOutline 
                      onClick={() => {setRowIdToDelete(request.id), setDeleteRow(true)}} 
                      sx={{color: "gray", cursor: "pointer"}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddRequest 
        open={openAddModal} 
        setOpen={setOpenAddModal} 
        editData={editData} 
        onSuccess={fetchRequests}
      />
      <ConfirmModal 
        open={deleteRow} 
        onClose={() => setDeleteRow(false)} 
        onConfirm={() => handleDelete(rowIdToDelete)} 
        value='Та сонгогдсон мөрийг системээс устгах гэж байна. Үнэхээр устгах уу?' 
      /> 
    </>
  );
};

export default Requests;