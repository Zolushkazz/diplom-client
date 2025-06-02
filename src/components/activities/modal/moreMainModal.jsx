"use client";

import {
    Avatar,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingComponent from "../../LoadingComp";
import LocationPicker from "../../LocationPicker";
import { activityApi } from "../../api";

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
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [markerPosition, setMarkerPosition] = useState({
        lat: Number(data?.lat) || 47.918873,
        lng: Number(data?.lng) || 106.917701,
    });

    const [activityData, setActivityData] = useState({
        activityName: "",
        activityType: "",
        department: "",
        status: "",
        startDate: "",
        startTime: "",
        endTime: "",
        district: "",
        participant: "",
        notes: "",
        decision: "",
        lat: 47.918873,
        lng: 106.917701,
    });

    // Modal нээгдэх үед data-г шинэчлэх
    useEffect(() => {
        if (open && data) {
            setActivityData({
                activityName: data.activityName || "",
                activityType: data.activityType || "",
                department: data.department || "",
                status: data.status || "",
                startDate: data.startDate || "",
                startTime: data.startTime || "",
                endTime: data.endTime || "",
                district: data.district || "",
                participant: data.participant || "",
                notes: data.notes || "",
                decision: data.decision || "",
                lat: data.lat || 47.918873,
                lng: data.lng || 106.917701,
            });
            setMarkerPosition({
                lat: Number(data.lat) || 47.918873,
                lng: Number(data.lng) || 106.917701,
            });
        }
    }, [open, data]);

    const handleSaveClick = async () => {
        setLoading(true);
        try {
            const res = await activityApi.updateActivityById(
                data?.id,
                activityData
            );
            if (res.status === 200) {
                setOpen(false);
                router.push("/activities");
            } else {
                console.error("Failed to save activity data", res);
            }
        } catch (error) {
            console.error("Error updating activity:", error);
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

                    <div className="flex gap-6 py-5 w-full px-8 overflow-y-auto">
                        {/* Зүүн хэсэг */}
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

                            {/* Activity type */}
                            <FormControl fullWidth size="small">
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

                            {/* Department */}
                            <FormControl fullWidth size="small">
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

                            {/* Status */}
                            <FormControl fullWidth size="small">
                                <InputLabel sx={labelStyle}>
                                    Үйл ажиллагааны төлөв
                                </InputLabel>
                                <Select
                                    value={activityData.status}
                                    onChange={(e) =>
                                        setActivityData({
                                            ...activityData,
                                            status: e.target.value,
                                        })
                                    }
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

                            {/* Start/End time */}
                            <div className="flex w-full gap-3">
                                <div className="flex flex-1 flex-col gap-1">
                                    <label className="text-gray-700 text-sm">
                                        Эхлэх огноо
                                    </label>
                                    <input
                                        type="date"
                                        className="border p-2 rounded-sm bg-white"
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
                                    <label className="text-gray-700 text-sm">
                                        Эхлэх цаг
                                    </label>
                                    <input
                                        type="time"
                                        className="border p-2 rounded-sm bg-white"
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
                                    <label className="text-gray-700 text-sm">
                                        Дуусах цаг
                                    </label>
                                    <input
                                        type="time"
                                        className="border p-2 rounded-sm bg-white"
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

                            {/* District */}
                            <FormControl fullWidth size="small">
                                <InputLabel sx={labelStyle}>Дүүрэг</InputLabel>
                                <Select
                                    value={activityData.district}
                                    onChange={(e) =>
                                        setActivityData({
                                            ...activityData,
                                            district: e.target.value,
                                        })
                                    }
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

                            {/* Location Picker */}
                            <LocationPicker
                                markerPosition={markerPosition}
                                setMarkerPosition={setMarkerPosition}
                                onLocationSelect={(coords) => {
                                    setMarkerPosition(coords);
                                    setActivityData((prev) => ({
                                        ...prev,
                                        lat: coords.lat,
                                        lng: coords.lng,
                                    }));
                                }}
                            />
                        </div>

                        {/* Баруун хэсэг */}
                        <div className="flex flex-col gap-4 w-1/2">
                            <h2 className="text-[15px] font-semibold">
                                Тэмдэглэл
                            </h2>
                            <textarea
                                className="w-full border border-[#E8E8E8] rounded-md px-4 py-2 focus:ring-1 outline-none bg-white"
                                rows={4}
                                placeholder="Тэмдэглэл"
                                value={activityData.notes}
                                onChange={(e) =>
                                    setActivityData({
                                        ...activityData,
                                        notes: e.target.value,
                                    })
                                }
                            />

                            <h2 className="text-[15px] font-semibold">
                                Шийдвэр
                            </h2>
                            <textarea
                                className="w-full border border-[#E8E8E8] rounded-md px-4 py-2 focus:ring-1 outline-none bg-white"
                                rows={4}
                                placeholder="Шийдвэр"
                                value={activityData.decision}
                                onChange={(e) =>
                                    setActivityData({
                                        ...activityData,
                                        decision: e.target.value,
                                    })
                                }
                            />

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
                    </div>
                </div>
            </Popover>
        </>
    );
};
