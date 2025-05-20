"use client";

import {
    Avatar,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    TextareaAutosize,
    TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { activityApi, employeeAPI } from "../../api";
import { useRouter } from "next/router";
import LoadingComponent from "../../LoadingComp";
import LocationPicker from "../../LocationPicker";

const labelStyle = {
    backgroundColor: "white",
    fontSize: 13,
};
const inputStyle = {
    "& .MuiInputLabel-root": { fontSize: 13, width: 220 },
    "& .MuiInputBase-input": { fontSize: 13, width: 220 },
};

const districtList = [
    "Баянзүрх",
    "Сонгинохайрхан",
    "Хан-Уул",
    "Баянгол",
    "Сүхбаатар",
    "Чингэлтэй",
    "Налайх",
    "Багануур",
    "Багахангай",
];

export const MoreMainModal = ({ open, setOpen, data }) => {
    const handleClose = () => setOpen(false);
    const [isCancel, setIsCancel] = useState(false);
    const [files, setFiles] = useState();

    const [markerPosition, setMarkerPosition] = useState({
        lat: 47.918873, // Улаанбаатар
        lng: 106.917701,
    });

    // console.log(data.activityType);

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [activityData, setActivityData] = useState({
        activityName: data?.activityName,
        activityType: data?.activityType,
        department: data?.department,
        status: data?.status,
        startDate: data?.startDate,
        startTime: data?.startTime,
        endTime: data?.endTime,
        district: data?.district,
        participant: data?.participant,
        notes: data?.notes,
        decision: data?.decision,
        lat: data?.lat,
        lng: data?.lng,
        file: files || "asc",
    });

    console.log("file data", files);
    console.log("data", data);

    const [location, setLocation] = useState({
        lat: 47.918873,
        lng: 106.917077,
    });

    const handleSaveClick = async () => {
        setLoading(true);
        try {
            const res = await activityApi.updateActivityById(
                data?.id,
                activityData
            );
            if (res.status === 200) {
                setOpen(false);
                router.push("/");
            } else {
                console.error("Failed to save employee data", res);
            }
        } catch (error) {
            console.error("Error updating employee:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <LoadingComponent />}
            <Popover
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                transformOrigin={{ vertical: "center", horizontal: "center" }}
                style={{ backgroundColor: "#3333" }}
                slotProps={{
                    paper: {
                        style: {
                            transform: "translateX(-25px) translateY(0%)",
                        },
                    },
                }}
            >
                <div className="w-[900px] h-[70vh] p-4 flex flex-col gap-3 text-[13px]">
                    <h2>Үйл ажиллагааны дэлгэрэнгүй мэдээлэл засах</h2>
                    <p className="border-b" />

                    <div className="flex gap-6 py-5 w-full px-8">
                        <div className="flex flex-col gap-3 w-1/2">
                            <h2 className="text-[15px] font-semibold">
                                Үндсэн мэдээлэл
                            </h2>

                            <TextField
                                size="small"
                                variant="outlined"
                                label="Үйл ажиллагааны нэр"
                                sx={inputStyle}
                                value={activityData.activityName}
                                onChange={(e) =>
                                    setActivityData({
                                        ...activityData,
                                        activityName: e.target.value,
                                    })
                                }
                            />

                            <FormControl fullWidth size="small">
                                {/* Act Type */}
                                <InputLabel sx={labelStyle}>
                                    Үйл ажиллагааны төрөл
                                </InputLabel>
                                <Select
                                    value={activityData.activityType}
                                    onChange={(e) =>
                                        setActivityData({
                                            ...activityData,
                                            activityType: e.target.value,
                                        })
                                    }
                                    fontSize="13px"
                                >
                                    <MenuItem
                                        value="Сургалт"
                                        sx={{ fontSize: 13 }}
                                    >
                                        Сургалт
                                    </MenuItem>
                                    <MenuItem
                                        value="Судалгаа"
                                        sx={{ fontSize: 13 }}
                                    >
                                        Судалгаа
                                    </MenuItem>
                                    <MenuItem
                                        value="Хурал"
                                        sx={{ fontSize: 13 }}
                                    >
                                        Хурал
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth size="small">
                                {/* Act Department */}
                                <InputLabel sx={labelStyle}>
                                    Үйл ажиллагааны хэлтэс
                                </InputLabel>
                                <Select
                                    value={activityData.department}
                                    onChange={(e) =>
                                        setActivityData({
                                            ...activityData,
                                            department: e.target.value,
                                        })
                                    }
                                    fontSize="13px"
                                >
                                    <MenuItem
                                        value="Мэдээлэл технологийн хэлтэс"
                                        sx={{ fontSize: 13 }}
                                    >
                                        Мэдээлэл технологийн хэлтэс
                                    </MenuItem>
                                    <MenuItem
                                        value="Захиргааны хэлтэс"
                                        sx={{ fontSize: 13 }}
                                    >
                                        Захиргааны хэлтэс
                                    </MenuItem>
                                    <MenuItem
                                        value="Төсөл менежментийн хэлтэс"
                                        sx={{ fontSize: 13 }}
                                    >
                                        Төсөл менежментийн хэлтэс
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth size="small">
                                {/* Act Status */}
                                <InputLabel sx={labelStyle}>
                                    Үйл ажиллагааны төлөв
                                </InputLabel>
                                <Select
                                    value={activityData?.status}
                                    onChange={(e) =>
                                        setActivityData({
                                            ...activityData,
                                            status: e.target.value,
                                        })
                                    }
                                    fontSize="13px"
                                >
                                    <MenuItem
                                        value="Эхлээгүй"
                                        sx={{ fontSize: 13 }}
                                    >
                                        Эхлээгүй
                                    </MenuItem>
                                    <MenuItem
                                        value="Явагдаж байгаа"
                                        sx={{ fontSize: 13 }}
                                    >
                                        Явагдаж байгаа
                                    </MenuItem>
                                    <MenuItem
                                        value="Дууссан"
                                        sx={{ fontSize: 13 }}
                                    >
                                        Дууссан
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            <div className="flex w-full gap-6">
                                <div className="flex flex-1 flex-col gap-1">
                                    {/* Start date */}
                                    <label className="text-gray-700 text-sm mb-1">
                                        Эхлэх огноо
                                    </label>
                                    <input
                                        type="date"
                                        className="border p-2 border-[#b5b5b5] rounded-sm bg-white"
                                        value={activityData.startDate}
                                        onChange={(e) =>
                                            setActivityData({
                                                ...activityData,
                                                startDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex flex-1 flex-col gap-1">
                                    <label className="text-gray-700 text-sm mb-1">
                                        Эхлэх цаг
                                    </label>
                                    <input
                                        type="time"
                                        className="border p-2 border-[#b5b5b5] rounded-sm bg-white"
                                        value={activityData.startTime}
                                        onChange={(e) =>
                                            setActivityData({
                                                ...activityData,
                                                startTime: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-1 flex-col gap-1">
                                    <label className="text-gray-700 text-sm mb-1">
                                        Дуусах цаг
                                    </label>
                                    <input
                                        type="time"
                                        className="border p-2 border-[#b5b5b5] rounded-sm bg-white"
                                        value={activityData.endTime}
                                        onChange={(e) =>
                                            setActivityData({
                                                ...activityData,
                                                endTime: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <FormControl fullWidth size="small">
                                {/* Act Districts */}
                                <InputLabel sx={labelStyle}>Дүүрэг</InputLabel>
                                <Select
                                    value={activityData.district || ""}
                                    onChange={(e) =>
                                        setActivityData({
                                            ...activityData,
                                            district: e.target.value,
                                        })
                                    }
                                    fontSize="13px"
                                >
                                    {districtList.map((district) => (
                                        <MenuItem
                                            key={district}
                                            value={district}
                                            sx={{ fontSize: 13 }}
                                        >
                                            {district}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <LocationPicker
                                setMarkerPosition={setLocation}
                                markerPosition={{
                                    lat: Number(activityData?.lat) || 0,
                                    lng: Number(activityData?.lng) || 0,
                                }}
                                onLocationSelect={(coords) => {
                                    setActivityData((prev) => ({
                                        ...prev,
                                        lat: coords.lat,
                                        lng: coords.lng,
                                    }));
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-4 w-1/2">
                            <h2 className="text-[15px] font-semibold">
                                Тэмдэглэл
                            </h2>
                            <TextareaAutosize
                                className="w-full bg-white border border-[#E8E8E8] rounded-md px-4 py-2 focus:ring-1 outline-none text-[13px]"
                                disabled={false}
                                minRows={3}
                                placeholder="Тэмдэглэл"
                                value={activityData.notes}
                                onChange={(e) =>
                                    setActivityData({
                                        ...activityData,
                                        notes: e.target.value,
                                    })
                                }
                                size="md"
                                variant="soft"
                            />

                            <h2 className="text-[15px] font-semibold">
                                Шийдвэр
                            </h2>
                            <TextareaAutosize
                                className="w-full bg-white border border-[#E8E8E8] rounded-md px-4 py-2 focus:ring-1 outline-none text-[13px]"
                                disabled={false}
                                minRows={3}
                                placeholder="Шийдвэр"
                                value={activityData.decision}
                                onChange={(e) =>
                                    setActivityData({
                                        ...activityData,
                                        decision: e.target.value,
                                    })
                                }
                                size="md"
                                variant="soft"
                            />

                            <h2 className="text-[15px] font-semibold">
                                Хавсралт файлууд
                            </h2>
                            <button
                                onClick={() => {
                                    setIsCancel(!isCancel);
                                    if (isCancel) setFiles([]); // Болих үед файл листийг цэвэрлэх
                                }}
                                className={`w-[40%] py-2 rounded-md text-white font-medium text-[13px] transition-colors duration-300 ${
                                    isCancel ? "bg-red-500" : "bg-[#015197]"
                                }`}
                            >
                                {isCancel ? "Болих" : "Нэмэх +"}
                            </button>

                            {/* Upload хэсэг */}
                            {isCancel && (
                                <div className="mt-4">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setFiles(
                                                    Array.from(e.target.files)
                                                );
                                            }
                                        }}
                                        className="mb-2"
                                    />

                                    {files?.length > 0 && (
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            {files.map((file, index) => (
                                                <li
                                                    key={index}
                                                    className="flex justify-between items-center border p-2 rounded"
                                                >
                                                    <span>{file.name}</span>
                                                    <button
                                                        onClick={() =>
                                                            setFiles((prev) =>
                                                                prev.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                )
                                                            )
                                                        }
                                                        className="text-red-500 text-xs"
                                                    >
                                                        Устгах
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-end font-semibold gap-3 p-3">
                        <button
                            onClick={handleSaveClick}
                            className="bg-[#015197] text-white px-2 py-1 flex items-center rounded-md"
                        >
                            Хадгалах
                        </button>
                        <button
                            onClick={handleClose}
                            className="text-[#015197]"
                        >
                            Гарах
                        </button>
                    </div>
                </div>
            </Popover>
        </>
    );
};
