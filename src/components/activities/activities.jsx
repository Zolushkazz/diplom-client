import React, { useEffect, useState } from "react";
import { Select, MenuItem, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Add, DeleteOutline } from "@mui/icons-material";
import { AddActivities } from "./modal/addActivities";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useRouter } from "next/router";
import { activityApi, employeeAPI } from "../api";
import LoadingComponent from "../LoadingComp";
import { useLoadingContext } from "../LoadingProvider";
import ConfirmModal from "../deleteWarningModal";

const data = [
    {
        id: "2024-1",
        name: "Сургалт 1",
        type: "Сургалт",
        registeredBy: "Анхаар",
        location: "Хэлтэс 1",
        date: "2024-11-11",
        status: "green",
    },
    {
        id: "2024-2",
        name: "Судалгаа 2",
        type: "Судалгаа",
        registeredBy: "Бадрал",
        location: "Хэлтэс 2",
        date: "2024-11-11",
        status: "red",
    },
    {
        id: "2024-3",
        name: "Хурал 3",
        type: "Хурал",
        registeredBy: "Эрдэнэ",
        location: "Хэлтэс 3",
        date: "2024-11-11",
        status: "red",
    },
];

const Activities = () => {
    const [year, setYear] = useState("2024");
    const [search, setSearch] = useState("");
    const [openAddModal, setOpenAddModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [deleteRow, setDeleteRow] = useState(false);
    const [rowIdToDelete, setRowIdToDelete] = useState(null);
    const { startLoading, stopLoading } = useLoadingContext();

    const [activities, setActivities] = useState([]);

    const router = useRouter();

    const handleRowClick = (row) => {
        router.push({
            pathname: "/moreActivity",
            query: {
                id: row.id,
            },
        });
        console.log("row", row);
    };

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await activityApi.getActivities();
            setActivities(response.data);
            console.log("res", response.data);
        } catch (error) {
            setError("Error fetching employee data");
        } finally {
            console.log("BOlo");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        startLoading("doing", "Үйлдэл хийж байна...");
        try {
            const response = await activityApi.deleteActivity(id);
            if (response.status === 200) {
                fetchEmployees();
                setDeleteRow(false);
                setRowIdToDelete(null);
                startLoading("done", "Амжилттай дууслаа!");
            }

            console.log("Employee deleted successfully:", response.data);
        } catch (error) {
            setError("Error deleting employee");
            startLoading("warn", "Алдаа гарлаа!");
        } finally {
            stopLoading();
        }

        setLoading(false);
    };

    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : (
                <div className="p-4 px-8 bg-white rounded-lg h-[93%]">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <h2 className="font-semibold text-[13px]">
                                Үйл ажиллагаанууд
                            </h2>
                            <Select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="h-7"
                            >
                                <MenuItem fontSize="13px" value="2025">
                                    2025
                                </MenuItem>
                                <MenuItem fontSize="13px" value="2024">
                                    2024
                                </MenuItem>
                                <MenuItem fontSize="13px" value="2023">
                                    2023
                                </MenuItem>
                            </Select>
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
                                    <th className="text-left p-2">Дугаар</th>
                                    <th className="text-left p-2">
                                        Үйл ажиллагааны нэр
                                    </th>
                                    <th className="text-left p-2">
                                        Үйл ажиллагааны төрөл
                                    </th>
                                    <th className="text-left p-2">
                                        Бүртгэсэн ЗБ
                                    </th>
                                    <th className="text-left p-2">
                                        Хийсэн газар, хэлтэс
                                    </th>
                                    <th className="text-left p-2">
                                        Бүртгэсэн огноо
                                    </th>
                                    <th className="text-left p-2">Үйлдэл</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities
                                    .filter((item) =>
                                        item.activityName
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    )
                                    .map((row) => (
                                        <tr
                                            key={row.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td
                                                onClick={() =>
                                                    handleRowClick(row)
                                                }
                                                className="border-t p-2"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${
                                                            row.status ===
                                                            "Эхлээгүй"
                                                                ? "bg-green-500"
                                                                : row.status ===
                                                                  "Явагдаж байгаа"
                                                                ? "bg-blue-500"
                                                                : "bg-red-500"
                                                        }`}
                                                    ></span>
                                                    {row.id}
                                                </div>
                                            </td>
                                            <td
                                                onClick={() =>
                                                    handleRowClick(row)
                                                }
                                                className="border-t p-2"
                                            >
                                                {row.activityName}
                                            </td>
                                            <td
                                                onClick={() =>
                                                    handleRowClick(row)
                                                }
                                                className="border-t p-2"
                                            >
                                                {row.activityType}
                                            </td>
                                            <td
                                                onClick={() =>
                                                    handleRowClick(row)
                                                }
                                                className="border-t p-2"
                                            >
                                                {row.authorId}
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
                                                {new Date(
                                                    row.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="border-t p-2 gap-2 cursor-pointer">
                                                <DeleteOutline
                                                    onClick={() => {
                                                        setRowIdToDelete(
                                                            row.id
                                                        ),
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
                    <AddActivities
                        open={openAddModal}
                        setOpen={setOpenAddModal}
                        onSuccess={fetchEmployees}
                    />
                    <ConfirmModal
                        open={deleteRow}
                        onClose={() => setDeleteRow(false)}
                        onConfirm={() => handleDelete(rowIdToDelete)}
                        value="Та сонгогдсон мөрийг системээс устгах гэж байна. Үнэхээр устгах уу?"
                    />
                </div>
            )}
        </>
    );
};

export default Activities;
