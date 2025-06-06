"use client";

import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Avatar, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { MoreMainModal } from "../modal/moreMainModal";
import { useRouter } from "next/router";
import { employeeAPI } from "../../api";

export const MoreHr = () => {
    const [openMoreModal, setOpenMoreModal] = useState(false);
    const [employee, setEmployee] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchEmployeeById = async () => {
            setLoading(true);
            try {
                const response = await employeeAPI.getEmployeeById(id);

                setEmployee(response.data);
                console.log("res by id", response.data);
            } catch (error) {
                setError("Error fetching employee data");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeById();
    }, []);

    const handleBackClick = () => {
        router.push("/hr");
    };

    return (
        <div className="p-4 px-8 bg-white rounded-lg text-[13px] h-[93%]">
            <KeyboardBackspaceOutlinedIcon
                onClick={handleBackClick} // Буцах товчийг дархад энэ функц ажиллана
                style={{ cursor: "pointer", fontSize: "30px" }}
            />
            <p className="border-b py-1"></p>
            <div className="flex w-full py-5 items-center justify-between">
                <h2 className="text-[15px] p-4 font-semibold ">
                    Дэлгэрэнгүй мэдээлэл
                </h2>
                <button
                    onClick={() => setOpenMoreModal(true)}
                    className="text-[#015197]"
                >
                    Засах
                </button>
            </div>
            <div className="flex px-8 gap-4">
                <div className="flex flex-col gap-5 items-center">
                    <img
                        src={
                            employee?.image
                                ? employee?.image
                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt={employee?.username}
                        className="rounded-full w-28 h-28"
                    />
                    {!employee?.image && (
                        <p className="line-clamp-2 w-[80%] text-center">
                            Одоогоор зураг оруулаагүй байна.
                        </p>
                    )}
                </div>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: "fit", bgcolor: "grey.100", marginX: 5 }}
                />
                <div className="flex flex-col gap-3">
                    <h2 className="font-semibold">Үндсэн мэдээлэл</h2>
                    <div>
                        <p className="text-[#B5B5B5]">Ургийн овог</p>
                        <p className="text-[#015197]">
                            {employee?.familyName
                                ? employee.familyName
                                : "Ургийн овог"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Эцэг эхийн нэр</p>
                        <p className="text-[#015197]">
                            {employee?.lastName
                                ? employee.lastName
                                : "Эцэг эхийн нэр"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Өөрийн нэр</p>
                        <p className="text-[#015197]">
                            {employee?.name ? employee.name : "Өөрийн нэр"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Төрсөн өдөр</p>
                        <p className="text-[#015197]">
                            {employee?.birthDate
                                ? employee.birthDate
                                : "Төрсөн өдөр"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Төрсөн аймаг/хот</p>
                        <p className="text-[#015197]">
                            {employee?.province
                                ? employee?.province
                                : "Төрсөн аймаг/хот"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Төрсөн сум/дүүрэг</p>
                        <p className="text-[#015197]">
                            {employee?.district
                                ? employee?.district
                                : "Төрсөн сум/дүүрэг"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Хүйс</p>
                        <p className="text-[#015197]">
                            {employee?.gender
                                ? employee?.gender === "male"
                                    ? "Эр"
                                    : "Эм"
                                : "Хүйс"}{" "}
                        </p>
                    </div>
                </div>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: "fit", bgcolor: "grey.100", marginX: 5 }}
                />
                <div className="flex flex-col gap-3">
                    <h2 className="font-semibold">Системийн мэдээлэл</h2>
                    <div>
                        <p className="text-[#B5B5B5]">Код</p>
                        <p className="text-[#015197]">
                            {employee?.id ? employee.id : "Код"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Нэвтрэх нэр</p>
                        <p className="text-[#015197]">
                            {employee?.username
                                ? employee.username
                                : "Нэвтрэх нэр"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Мэргэжил</p>
                        <p className="text-[#015197]">
                            {employee?.major ? employee.major : "Мэргэжил"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Хэлтсийн нэр</p>
                        <p className="text-[#015197]">
                            {employee?.department
                                ? employee.department
                                : "Хэлтсийн нэр"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Хэрэглэгчийн төрөл</p>
                        <p className="text-[#015197]">
                            {employee?.role
                                ? employee.role
                                : "Хэрэглэгчийн төрөл"}
                        </p>
                    </div>
                </div>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ height: "fit", bgcolor: "grey.100", marginX: 5 }}
                />
                <div className="flex flex-col gap-3">
                    <h2 className="font-semibold">Холбоо барих мэдээлэл</h2>
                    <div>
                        <p className="text-[#B5B5B5]">Гар утас</p>
                        <p className="text-[#015197]">
                            {employee?.phone ? employee.phone : "Утас"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Ажлын утас</p>
                        <p className="text-[#015197]">
                            {employee?.workPhone
                                ? employee.workPhone
                                : "Ажлын Утас"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">И-мэйл</p>
                        <p className="text-[#015197]">
                            {employee?.email ? employee.email : "Имэйл"}
                        </p>
                    </div>
                    <div>
                        <p className="text-[#B5B5B5]">Хаяг</p>
                        <p className="text-[#015197]">
                            {employee?.address ? employee.address : "Хаяг"}
                        </p>
                    </div>
                </div>
            </div>
            <MoreMainModal
                data={employee}
                open={openMoreModal}
                setOpen={setOpenMoreModal}
            />
        </div>
    );
};
