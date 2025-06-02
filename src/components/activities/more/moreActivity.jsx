"use client";

import { useRouter } from "next/router";
import { useEffect, useState, Fragment } from "react";
import { Avatar, Divider, Textarea, TextareaAutosize } from "@mui/material";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoMdPin } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { activityApi } from "../../api";
import { MoreMainModal } from "../modal/moreMainModal";
import { MoreParticipantModal } from "../modal/moreParticipantModal";
import LocationPicker from "../../LocationPicker";

export const MoreActivity = () => {
    const router = useRouter();
    const { id } = router.query;

    const [activity, setActivity] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [markerPosition, setMarkerPosition] = useState({
        lat: 47.918873, // Улаанбаатар
        lng: 106.917701,
    });
    const [openMoreModal, setOpenMoreModal] = useState(false);
    const [openMoreParticipantModal, setOpenMoreParticipantModal] =
        useState(false);
    const [isCancel, setIsCancel] = useState(false);

    useEffect(() => {
        const fetchActivityById = async () => {
            setLoading(true);
            try {
                const response = await activityApi.getActivityById(id);
                setActivity(response.data);
                console.log("Activity data by ID:", response.data);
            } catch (error) {
                setError("Error fetching activity data");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchActivityById();
        }
    }, [id]);

    const handleBackClick = () => {
        router.push("/activities");
    };

    return (
        <div className="bg-white p-4 px-8 rounded-lg h-screen overflow-y-scroll text-[13px]">
            {/* BACK BUTTON */}
            <KeyboardBackspaceOutlinedIcon
                onClick={handleBackClick}
                className="cursor-pointer text-2xl"
            />
            <hr className="my-2" />

            {/* ҮНДСЭН МЭДЭЭЛЭЛ */}
            <div className="py-8 px-8 flex gap-4">
                <div className="flex flex-1 flex-col gap-4">
                    {/* Үндсэн мэдээлэл Header */}
                    <div className="flex justify-between">
                        <h2 className="font-semibold">Үндсэн мэдээлэл:</h2>
                        <button
                            onClick={() => setOpenMoreModal(true)}
                            className="border border-[#6B6B6B] text-[#6B6B6B] rounded-md p-1"
                        >
                            <HiOutlinePencilAlt size={15} />
                        </button>
                    </div>

                    {/* Үндсэн мэдээллийн хүснэгт */}
                    <div className="grid grid-cols-5 border border-gray-300 rounded-md divide-x divide-gray-300 text-sm text-white">
                        {/* Нэг мөрийн мэдээлэл */}
                        {[
                            {
                                label: "Дугаар",
                                value: activity?.id ?? 12345687,
                            },
                            {
                                label: "Нэр",
                                value: activity?.activityName ?? "Сургалт 1",
                            },
                            {
                                label: "Төрөл",
                                value: activity?.activityType ?? "Төрөл",
                            },
                            {
                                label: "Хийсэн хэлтэс",
                                value: activity?.department ?? "Хэлтэс 1",
                            },
                            {
                                label: "Бүртгэсэн огноо",
                                value: activity?.createdAt
                                    ? new Date(
                                          activity.createdAt
                                      ).toLocaleDateString()
                                    : "2024-02-02",
                            },
                            {
                                label: "Төлөв",
                                value: activity?.status ?? "Эхлээгүй",
                                color:
                                    activity?.status === "Явагдаж байгаа"
                                        ? "text-blue-500"
                                        : activity?.status === "Дууссан"
                                        ? "text-red-500"
                                        : "text-[#65D438]",
                            },
                            {
                                label: "Огноо",
                                value: activity?.startDate
                                    ? new Date(
                                          activity.startDate
                                      ).toLocaleDateString()
                                    : "Мэдээлэл байхгүй байна.",
                            },
                            {
                                label: "Цаг",
                                value:
                                    activity?.startTime && activity?.endTime
                                        ? `${activity.startTime} - ${activity.endTime}`
                                        : "Мэдээлэл байхгүй байна.",
                            },
                            {
                                label: "Дүүрэг",
                                value:
                                    activity?.district ??
                                    "Мэдээлэл байхгүй байна.",
                            },
                            {
                                label: "Оролцогчдын тоо",
                                value: Array.isArray(activity?.participant)
                                    ? activity.participant.length
                                    : "Мэдээлэл байхгүй байна.",
                            },
                        ].map(({ label, value, color }, idx) => (
                            <div key={idx} className="px-2 py-3">
                                <p className="text-gray-400 font-medium">
                                    {label}
                                </p>
                                <p className={`text-[#015197] ${color ?? ""}`}>
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Байршлын мэдээлэл */}
                    <div className="flex flex-col gap-2">
                        <h2 className="font-semibold">Байршлын мэдээлэл:</h2>
                        <button
                            onClick={() => setIsCancel(!isCancel)}
                            className={`w-[40%] py-2 rounded-md text-white font-medium text-[13px] transition-colors duration-300 ${
                                isCancel ? "bg-red-500" : "bg-[#015197]"
                            }`}
                        >
                            {isCancel ? "Болих" : "Харах"}
                        </button>
                        {isCancel && (
                            <LocationPicker
                                // className="h-[40%]"
                                setMarkerPosition={setMarkerPosition}
                                markerPosition={{
                                    lat: Number(activity?.lat) || 0,
                                    lng: Number(activity?.lng) || 0,
                                }}
                                disabled={true}
                            />
                        )}
                    </div>

                    {/* Тэмдэглэл */}
                    <div>
                        <h2 className="font-semibold py-3">Тэмдэглэл:</h2>
                        <textarea
                            className="w-full border border-[#E8E8E8] rounded-md px-4 py-2 focus:ring-1 outline-none bg-white"
                            rows={4}
                            placeholder="Шийдвэр"
                            disabled={true}
                            value={activity?.notes}
                        />
                    </div>

                    {/* Шийдвэр */}
                    <div>
                        <h2 className="font-semibold py-3">Шийдвэр:</h2>
                        <textarea
                            className="w-full border border-[#E8E8E8] rounded-md px-4 py-2 focus:ring-1 outline-none bg-white"
                            rows={4}
                            disabled={true}
                            placeholder="Шийдвэр"
                            value={activity?.decision}
                        />
                    </div>

                    {/* Хавсралт файлууд */}
                    <div>
                        <h2 className="font-semibold py-3">
                            Хавсралт файлууд:
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border-b border-gray-300 text-[13px]">
                                <thead className="text-[#015197]">
                                    <tr>
                                        <th className="text-left p-2">№</th>
                                        <th className="text-left p-2">
                                            Файлын нэр
                                        </th>
                                        <th className="text-left p-2">
                                            Нэмэгдсэн огноо
                                        </th>
                                        <th className="text-left p-2">
                                            Үйлдэл
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activity?.file?.length > 0 ? (
                                        activity.file.map((item, idx) => (
                                            <tr key={idx} className="border-t">
                                                <td className="p-2">
                                                    {idx + 1}
                                                </td>
                                                <td className="p-2">{item}</td>
                                                <td className="p-2">
                                                    [--/-- --:--]
                                                </td>
                                                <td className="p-2">
                                                    <FaRegTrashCan
                                                        size={20}
                                                        className="cursor-pointer text-red-500"
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="text-center py-4 text-gray-500"
                                            >
                                                Хавсралт файл алга байна.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* VERTICAL DIVIDER */}
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: "fit", bgcolor: "grey.100", marginX: 5 }}
                />

                {/* Оролцогчид */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between py-3">
                        <h2 className="font-semibold">Оролцогчид:</h2>
                        <button
                            onClick={() => setOpenMoreParticipantModal(true)}
                            className="text-[#6B6B6B] border border-[#6B6B6B] rounded-md p-1"
                        >
                            <HiOutlinePencilAlt size={15} />
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-3">
                            <h2 className="font-normal text-[#B5B5B5]">
                                Үндсэн гишүүд
                            </h2>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center gap-4">
                                    <img
                                        src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid&w=740"
                                        alt="name"
                                        className="rounded-full p-1 w-[50px] h-[50px] object-cover border-2"
                                    />
                                    <div className="text-[12px]">
                                        <p className="font-bold">С.Солонго</p>
                                        <p className="text-[#6B6B6B]">
                                            Программист
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                height: "fit",
                                bgcolor: "grey.100",
                                marginX: 5,
                            }}
                        />
                        <div className="flex flex-col gap-3">
                            <h2 className="font-normal text-[#B5B5B5]">
                                Байлцагчид
                            </h2>
                            <div className="flex flex-col gap-3">
                                {activity?.participant ? (
                                    activity?.participant.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center gap-4"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt="name"
                                                    className="rounded-full p-1 w-[50px] h-[50px] object-cover border-2"
                                                />
                                                <div className="text-[12px]">
                                                    <p className="font-bold">
                                                        {item.firstName}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <span className="text-[#B5B5B5] text-[13px]">
                                        Мэдээлэл байхгүй байна.
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MoreMainModal
                data={activity}
                open={openMoreModal}
                setOpen={setOpenMoreModal}
            />
            <MoreParticipantModal
                data={activity}
                open={openMoreParticipantModal}
                setOpen={setOpenMoreParticipantModal}
            />
        </div>
    );
};
