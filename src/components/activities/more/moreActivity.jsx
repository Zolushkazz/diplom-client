"use client";

import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Avatar, Divider, Textarea, TextareaAutosize } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { activityApi } from "../../api";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IoMdPin } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { MoreMainModal } from "../modal/moreMainModal";
import { MoreParticipantModal } from "../modal/moreParticipantModal";
import LocationPicker from "../../LocationPicker";

export const MoreActivity = () => {
    const [openMoreModal, setOpenMoreModal] = useState(false);
    const [openMoreParticipantModal, setOpenMoreParticipantModal] =
        useState(false);
    const [activity, setActivity] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [markerPosition, setMarkerPosition] = useState({
        lat: 47.918873, // Улаанбаатар
        lng: 106.917701,
    });
    const [location, setLocation] = useState(null);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchAtivityById = async () => {
            setLoading(true);
            try {
                const response = await activityApi.getActivityById(id);

                setActivity(response.data);
                console.log("res by id", response.data);
                setLocation({
                    lat: activity?.lat,
                    lng: activity?.lng,
                });
            } catch (error) {
                setError("Error fetching activity data");
            } finally {
                setLoading(false);
            }
        };

        fetchAtivityById();
    }, []);

    const handleBackClick = () => {
        router.push("/activities"); // Буцах үйлдлийг гүйцэтгэнэ
    };

    return (
        <div className="bg-white">
        <div className="p-4 px-8 bg-white rounded-lg text[13px] h-screen overflow-y-scroll">
            {/* BACK */}
            <KeyboardBackspaceOutlinedIcon
                onClick={handleBackClick} // Буцах товчийг дархад энэ функц ажиллана
                style={{ cursor: "pointer", fontSize: "30px" }}
            />
            <p className="border-b py-1"></p>
            <div className="flex py-8 px-8 gap-4">
                <div className="flex flex-1 flex-col gap-3">
                    <div className="flex w-full justify-between py-3">
                        <h2 className="font-semibold">Үндсэн мэдээлэл:</h2>
                        <div className="flex gap-2 py-3">
                            <button
                                onClick={() => setOpenMoreModal(true)}
                                className="text-[#6B6B6B] border border-[#6B6B6B] rounded-md p-1"
                            >
                                <IoMdPin size={15} />
                            </button>
                            <button
                                onClick={() => setOpenMoreModal(true)}
                                className="text-[#6B6B6B] border border-[#6B6B6B] rounded-md p-1"
                            >
                                <HiOutlinePencilAlt size={15} />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 border border-gray-300 rounded-md divide-x divide-gray-300 text-sm text-white">
                        {/* First Row */}
                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">Дугаар</p>
                            <p className="text-[#015197]">
                                {!activity?.id ? 12345687 : activity.id}
                            </p>
                        </div>
                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">Нэр</p>
                            <p className="text-[#015197]">
                                {!activity?.activityName
                                    ? "Сургалт 1"
                                    : activity.activityName}
                            </p>
                        </div>
                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">Төрөл</p>
                            <p className="text-[#015197]">
                                {!activity?.activityType
                                    ? "Төрөл"
                                    : activity.activityType}
                            </p>
                        </div>
                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">
                                Хийсэн хэлтэс
                            </p>
                            <p className="text-[#015197]">
                                {!activity?.department
                                    ? "Хэлтэс 1"
                                    : activity.department}
                            </p>
                        </div>
                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">
                                Бүртгэсэн огноо
                            </p>
                            <p className="text-[#015197]">
                                {!activity?.createdAt
                                    ? "2024-02-02"
                                    : new Date(
                                          activity.createdAt
                                      ).toLocaleDateString()}
                            </p>
                        </div>

                        {/* Second Row */}
                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">Төлөв</p>
                            <p
                                className={`font-medium ${
                                    !activity?.status ||
                                    activity.status === "Эхлээгүй"
                                        ? "text-[#65D438]" // ногоон
                                        : activity.status === "Явагдаж байгаа"
                                        ? "text-blue-500"
                                        : "text-red-500"
                                }`}
                            >
                                {!activity?.status
                                    ? "Эхлээгүй"
                                    : activity.status}
                            </p>
                        </div>

                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">Огноо</p>
                            <p className="text-[#015197]">
                                {!activity?.startDate
                                    ? "Мэдээлэл байхгүй байна."
                                    : new Date(
                                          activity.startDate
                                      ).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">Цаг</p>
                            <p className="text-[#015197]">
                                {!activity?.startTime && !activity?.endTime
                                    ? "Мэдээлэл байхгүй байна."
                                    : `${activity.startTime} : ${activity.endTime}`}
                            </p>
                        </div>
                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">Дүүрэг</p>
                            <p className="text-[#015197]">
                                {!activity?.district
                                    ? "Мэдээлэл байхгүй байна."
                                    : activity.district}
                            </p>
                        </div>
                        <div className="px-2 py-3">
                            <p className="text-gray-400 font-medium">
                                Оролцогчдын тоо
                            </p>
                            <p className="text-[#015197]">
                                {Array.isArray(activity?.participant)
                                    ? activity.participant.length
                                    : "Мэдээлэл байхгүй байна."}
                            </p>
                        </div>
                    </div>

                    <LocationPicker
                        setMarkerPosition={setMarkerPosition}
                        markerPosition={markerPosition}
                        onLocationSelect={(coords) => {
                            setActivity((prev) => ({
                                ...prev,
                                lat: coords.lat,
                                lng: coords.lng,
                            }));
                        }}
                        disabled={true}
                    />

                    <div className="flex w-full justify-between py-3">
                        <h2 className="font-semibold">Тэмдэглэл:</h2>
                        <div className="flex gap-2 py-3">
                            <button
                                onClick={() => setOpenMoreModal(true)}
                                className="text-[#6B6B6B] border border-[#6B6B6B] rounded-md p-1"
                            >
                                <HiOutlinePencilAlt size={15} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <TextareaAutosize
                            className="w-full bg-white border border-[#E8E8E8] rounded-md px-4 py-2 focus:ring-1 outline-none text-[13px]"
                            disabled={false}
                            minRows={5}
                            value={activity?.notes}
                            size="md"
                            variant="soft"
                            placeholder="Одоогоор тэмдэглэл байхгүй байна."
                        />
                    </div>

                    <div className="flex w-full justify-between py-3">
                        <h2 className="font-semibold">Шийдвэр:</h2>
                        <div className="flex gap-2 py-3">
                            <button
                                onClick={() => setOpenMoreModal(true)}
                                className="text-[#6B6B6B] border border-[#6B6B6B] rounded-md p-1"
                            >
                                <HiOutlinePencilAlt size={15} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <TextareaAutosize
                            className="w-full bg-white border border-[#E8E8E8] rounded-md px-4 py-2 focus:ring-1 outline-none text-[13px]"
                            disabled={false}
                            minRows={5}
                            value={activity?.decision}
                            size="md"
                            variant="soft"
                            placeholder="Одоогоор шийдвэр байхгүй байна."
                        />
                    </div>

                    <div className="flex w-full justify-between py-3">
                        <h2 className="font-semibold">Хавсралт файлууд:</h2>
                        <div className="flex gap-2 py-3">
                            <button
                                onClick={() => setOpenMoreModal(true)}
                                className="text-[#6B6B6B] border border-[#6B6B6B] rounded-md p-1"
                            >
                                <HiOutlinePencilAlt size={15} />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border-b py-3 border-gray-300 text-[13px]">
                            <thead className="text-[#015197]">
                                <tr>
                                    <th className="text-left p-2">№</th>
                                    <th className="text-left p-2">
                                        Файлын нэр
                                    </th>
                                    <th className="text-left p-2">
                                        Нэмэгдсэн огноо
                                    </th>
                                    <th className="text-left p-2">Үйлдэл</th>
                                </tr>
                            </thead>
                            {console.log(activity?.file)}
                            <tbody>
                                {activity?.file && activity.file.length > 0 ? (
                                    activity.file.map((item, index) => (
                                        <tr
                                            key={index}
                                            className="border-t p-2"
                                        >
                                            <td className="text-left p-2">
                                                {index + 1}
                                            </td>
                                            <td className="text-left p-2">
                                                {item}
                                            </td>
                                            <td className="text-left p-2">
                                                [--/-- --:--]
                                            </td>{" "}
                                            {/* Хэрвээ огноо байдаг бол харуул */}
                                            <td className="text-left p-2">
                                                <FaRegTrashCan
                                                    onClick={() =>
                                                        handleDelete(index)
                                                    }
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
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: "fit", bgcolor: "grey.100", marginX: 5 }}
                />
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
        </div></div>
    );
};
