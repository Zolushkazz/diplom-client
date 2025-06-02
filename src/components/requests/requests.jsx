"use client";

import React, { useEffect, useState } from "react";
import { Select, MenuItem, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
    const [pageRefresh, setPageRefresh] = useState(false);

    const fetchRequests = async () => {
        try {
            const response = await requestAPI.getRequests();
            setGetRequests(response.data);
            setPageRefresh(false);
        } catch (error) {
            setError("Error fetching request data");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        if (!pageRefresh) return;
        fetchRequests();
    }, [pageRefresh]);

    const handleEdit = (id) => {
      fetchReqMore(id);
      setOpenAddModal(true);
    };

    const fetchReqMore = async (reqId) => {     
      try {
        const response = await requestAPI.getRequestById(reqId);
        if (response.status == 200) {
          setEditData(response.data);
        }
      } catch (error) { 
        setError("Error fetching request data");
      }
    }

    const handleDelete = async (id) => {
        try {
            const response = await requestAPI.deleteRequest(id);
            if (response.status === 200) {
                setPageRefresh(true);
                setDeleteRow(false);
                setRowIdToDelete(null);
            }
        } catch (error) {
            console.error("Error:", error);
            setError(error.message || "Алдаа гарлаа. Дахин оролдоно уу.");
        }
    };

    const handleRowClick = (rowId) => {
        router.push({
            pathname: "/requests/requestsMore",
            query: {
                id: row.id,
            },
        });
    };

    return (
        <>
            <div className="p-4 px-8 bg-white rounded-lg h-[93%]">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <h2 className="font-semibold text-[13px]">Хүсэлтүүд</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center px-2 relative">
                            <TextField
                                placeholder="Хайлт"
                                variant="outlined"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                size="small"
                                sx={{ fontSize: 13 }}
                            />
                            <SearchIcon
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 10,
                                }}
                            />
                        </div>
                        <Add
                            onClick={() => setOpenAddModal(true)}
                            className="cursor-pointer"
                            sx={{ color: "gray" }}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border-b py-3 border-gray-300 text-[13px]">
                        <thead className="text-[#015197]">
                            <tr>
                                <th className="text-left p-2">
                                    Хүлээн авах ажилтан
                                </th>
                                <th className="text-left p-2">
                                    Бүртгэсэн ажилтан
                                </th>
                                {/* <th className="text-left p-2">
                                    Хүсэлт бүртгэсэн хэлтэс
                                </th> */}
                                {/* <th className="text-left p-2">
                                    Хүсэлтийн төрөл
                                </th> */}
                                <th className="text-left p-2">Товч тайлбар</th>
                                <th className="text-left p-2">
                                    Бүртгэсэн огноо
                                </th>
                                <th className="text-left p-2">
                                    Хариу авах огноо
                                </th>
                                <th className="text-left p-2">Үйлдэл</th>
                            </tr>
                        </thead>
                        <tbody className="cursor-pointer">
                            {requests
                                .filter((item) =>
                                    item.name
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )
                                .map((request, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => handleRowClick(request.id)}
                                    >
                                        <td className="border-t p-2">
                                            {request.name}
                                        </td>
                                        <td className="border-t p-2">
                                            {request.registeredEmployee}
                                        </td>
                                        {/* <td className="border-t p-2">
                                            {request.department}
                                        </td> */}
                                        {/* <td className="border-t p-2">
                                            {request.description}
                                        </td> */}
                                        <td className="border-t p-2 break-words">
                                            {request.notes}
                                        </td>
                                        <td className="border-t p-2">
                                            {request.createdAt.slice(0, 10)}
                                        </td>
                                        <td className="border-t p-2">
                                            {request.startDate}
                                        </td>
                                        <td className="border-t p-2 flex items-center">
                                            <EditOutlinedIcon
                                                sx={{
                                                    color: "gray",
                                                    cursor: "pointer",
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(request.id);
                                                }}
                                            />
                                            <DeleteOutline
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setRowIdToDelete(
                                                        request.id
                                                    );
                                                    setDeleteRow(true);
                                                }}
                                                sx={{
                                                    color: "gray",
                                                    cursor: "pointer",
                                                }}
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
                setEditData={setEditData}
                onSuccess={setPageRefresh}
            />
            <ConfirmModal
                open={deleteRow}
                onClose={() => setDeleteRow(false)}
                onConfirm={() => handleDelete(rowIdToDelete)}
                value="Та сонгогдсон мөрийг системээс устгах гэж байна. Үнэхээр устгах уу?"
            />
        </>
    );
};

export default Requests;
