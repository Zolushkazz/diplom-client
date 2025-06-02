"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Select, MenuItem, TextField } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Add, DeleteOutline, PrintTwoTone } from "@mui/icons-material";
import { AddWorker } from "./modal/addWorker";
import { employeeAPI } from "../api";
import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";
import LoadingComponent from "../LoadingComp";
import ConfirmModal from "../deleteWarningModal";
import { useLoadingContext } from "../LoadingProvider";
import { toast, ToastContainer } from "react-toastify";

const employees = [
    {
        name: "Анар",
        lastName: "Бат",
        department: "Хэлтэс 1",
        role: "Оролцогч",
        email: "a@gmail.com",
        phone: "99999999",
    },
    {
        name: "Бадрал",
        lastName: "Болд",
        department: "Хэлтэс 1",
        role: "Зохион байгуулагч",
        email: "b@gmail.com",
        phone: "99999999",
    },
    {
        name: "Эрдэнэ",
        lastName: "Хангай",
        department: "Хэлтэс 1",
        role: "Зохион байгуулагч",
        email: "e@gmail.com",
        phone: "99999999",
    },
];

const HR = () => {
    const [year, setYear] = useState("2024");
    const [search, setSearch] = useState("");
    const [openAddModal, setOpenAddModal] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteRow, setDeleteRow] = useState(false);
    const [rowIdToDelete, setRowIdToDelete] = useState(null);
    const { startLoading, stopLoading } = useLoadingContext();
    const [editData, setEditData] = useState(null);

    const router = useRouter();

    const handleRowClick = (row) => {
        router.push({
            pathname: "/hr/moreHr",
            query: {
                id: row.id,
            },
        });
    };

    console.log("edit", editData);

    const handleEdit = (employee) => {
        setEditData(employee);
        setOpenAddModal(true);
    };

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const response = await employeeAPI.getEmployees();
            setEmployees(response.data);
            setPageRefresh(false);
            console.log("res", response.data);
        } catch (error) {
            setError("Error fetching employee data");
            startLoading("warn", "Алдаа гарлаа!");
        } finally {
            setLoading(false);
            stopLoading();
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await employeeAPI.deleteEmployee(id);

            if (response.status === 200) {
                fetchEmployees();
                setDeleteRow(false);
                setRowIdToDelete(null);
                toast.success("Амжилттай устгагдлаа!");
            }

            console.log("del res", response);
            console.log("Employee deleted successfully:", response.data);
            setLoading(false);
        } catch (error) {
            console.log("error", error);

            if (error.response && error.response.status === 403) {
                toast.warn("Танд энэ үйлдлийг хийх эрх байхгүй байна!");
            } else {
                setError(error.message || "Алдаа гарлаа. Дахин оролдоно уу.");
                toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
            }
        }
    };

    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    <div className="p-4 px-8 bg-white rounded-lg h-[93%]">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-4">
                                <h2 className="font-semibold text-[13px]">
                                    Ажилчид
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center px-2 relative">
                                    <TextField
                                        placeholder="Хайлт"
                                        variant="outlined"
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
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
                                <thead className="text-[#015197] ">
                                    <tr>
                                        <th className="text-left p-2">Нэр</th>
                                        <th className="text-left p-2">Овог</th>
                                        <th className="text-left p-2">
                                            Хэлтэс
                                        </th>
                                        <th className="text-left p-2">
                                            Эрхийн төрөл
                                        </th>
                                        <th className="text-left p-2">Имэйл</th>
                                        <th className="text-left p-2">Утас</th>
                                        <th className="text-left p-2">
                                            Үйлдэл
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees
                                        .filter((item) =>
                                            item.name
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                        )
                                        .map((row) => (
                                            <tr
                                                key={row.id}
                                                className="hover:bg-gray-50 cursor-pointer"
                                            >
                                                <td
                                                    onClick={() =>
                                                        handleRowClick(row)
                                                    }
                                                    className="border-t p-2"
                                                >
                                                    {row.name}
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        handleRowClick(row)
                                                    }
                                                    className="border-t p-2"
                                                >
                                                    {row.lastName}
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        handleRowClick(row)
                                                    }
                                                    className="border-t p-2"
                                                >
                                                    {row.department}
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        handleRowClick(row)
                                                    }
                                                    className="border-t p-2"
                                                >
                                                    {row.role}
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        handleRowClick(row)
                                                    }
                                                    className="border-t p-2"
                                                >
                                                    {row?.email ? (
                                                        row?.email
                                                    ) : (
                                                        <span className="text-[#ccc]">
                                                            xxx@example.com
                                                        </span>
                                                    )}
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        handleRowClick(row)
                                                    }
                                                    className="border-t p-2"
                                                >
                                                    {row?.phone ? (
                                                        row?.phone
                                                    ) : (
                                                        <span className="text-[#ccc]">
                                                            99999999
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="border-t p-2 flex gap-2">
                                                    <EditOutlinedIcon
                                                        sx={{
                                                            color: "gray",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEdit(row);
                                                        }}
                                                    />
                                                    <DeleteOutline
                                                        onClick={() => {
                                                            setRowIdToDelete(
                                                                row.id
                                                            ),
                                                                setDeleteRow(
                                                                    true
                                                                );
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
                    <ToastContainer />
                    <AddWorker
                        open={openAddModal}
                        setOpen={setOpenAddModal}
                        onSuccess={() => {
                            fetchEmployees();
                            toast.success("Амжилттай хадгалагдлаа!");
                        }}
                        onError={() => {
                            toast.warn(
                                "Танд энэ үйлдлийг хийх эрх байхгүй байна!"
                            );
                        }}
                        editData={editData}
                        setEditData={setEditData}
                    />
                    <ConfirmModal
                        open={deleteRow}
                        onClose={() => setDeleteRow(false)}
                        onConfirm={() => handleDelete(rowIdToDelete)}
                        value="Та сонгогдсон мөрийг системээс устгах гэж байна. Үнэхээр устгах уу?"
                    />
                </>
            )}
        </>
    );
};

export default HR;
