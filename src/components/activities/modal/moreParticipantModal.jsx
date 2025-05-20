"use client";

import {
    Avatar,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { activityApi, employeeAPI } from "../../api";
import { useRouter } from "next/router";
import LoadingComponent from "../../LoadingComp";
import { FaRegTrashCan } from "react-icons/fa6";

const labelStyle = {
    backgroundColor: "white",
    fontSize: 13,
};
const inputStyle = {
    "& .MuiInputLabel-root": { fontSize: 13, width: 220 },
    "& .MuiInputBase-input": { fontSize: 13, width: 220 },
};

export const MoreParticipantModal = ({ open, setOpen, data }) => {
    const handleClose = () => setOpen(false);
    const [isCancel, setIsCancel] = useState(false);
    const [employees, setEmployees] = useState([]);

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
        file: data?.file,
    });

    console.log("activity data", activityData);

    useEffect(() => {
        if (data) {
            console.log("pro data", data);

            setActivityData(data);
        }
    }, [data]);

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

    const [participantForm, setParticipantForm] = useState({
        lastName: "",
        firstName: "",
        phone: "",
        email: "",
        address: "",
        image: "",
    });

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const response = await employeeAPI.getEmployees();
            setEmployees(response.data);
            console.log("res", response.data);
        } catch (error) {
            setError("Error fetching employee data");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleAddParticipant = () => {
        setActivityData((prev) => ({
            ...prev,
            participant: [...(prev.participant || []), participantForm],
        }));

        console.log(participantForm);

        setParticipantForm(participantForm);
        setIsCancel(false);
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
                <div className="w-[900px] p-4 flex flex-col gap-3 text-[13px]">
                    <h2>Оролцогчдын дэлгэрэнгүй</h2>
                    <p className="border-b" />

                    <div className="flex gap-6 py-5 w-full px-8">
                        <div className="flex flex-col gap-4 w-1/2">
                            <h2 className="text-[15px] font-semibold">
                                Үндсэн гишүүд
                            </h2>

                            <div className="flex flex-col gap-3 pr-10">
                                {employees ? (
                                    employees.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center gap-4"
                                            >
                                                <div className="flex gap-5 items-center">
                                                    <img
                                                        src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid&w=740"
                                                        alt="name"
                                                        className="rounded-full p-1 w-[50px] h-[50px] object-cover border-2"
                                                    />
                                                    <div className="text-[12px]">
                                                        <p className="font-bold">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button>
                                                    <FaRegTrashCan size={20} />
                                                </button>
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

                        <div className="flex flex-col pr-10 gap-4 w-1/2">
                            <h2 className="text-[15px] font-semibold">
                                Байлцагчид
                            </h2>

                            <div className="flex flex-col gap-3">
                                {activityData?.participant ? (
                                    activityData?.participant.map(
                                        (item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center gap-4"
                                                >
                                                    <div className="flex gap-5 items-center">
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
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(index)
                                                        }
                                                    >
                                                        <FaRegTrashCan
                                                            size={20}
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <span className="text-[#B5B5B5] text-[13px]">
                                        Мэдээлэл байхгүй байна.
                                    </span>
                                )}
                            </div>

                            <button
                                onClick={() => setIsCancel(!isCancel)}
                                className={`w-[40%] py-2 rounded-md text-white font-medium text-[13px] transition-colors duration-300 ${
                                    isCancel ? "bg-red-500" : "bg-[#015197]"
                                }`}
                            >
                                {isCancel ? "Болих" : "Нэмэх +"}
                            </button>

                            {isCancel && (
                                <>
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        label="Овог"
                                        sx={inputStyle}
                                        value={participantForm.lastName}
                                        onChange={(e) =>
                                            setParticipantForm({
                                                ...participantForm,
                                                lastName: e.target.value,
                                            })
                                        }
                                    />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        label="Нэр"
                                        sx={inputStyle}
                                        value={participantForm.firstName}
                                        onChange={(e) =>
                                            setParticipantForm({
                                                ...participantForm,
                                                firstName: e.target.value,
                                            })
                                        }
                                    />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        label="Гар утас"
                                        sx={inputStyle}
                                        value={participantForm.phone}
                                        onChange={(e) =>
                                            setParticipantForm({
                                                ...participantForm,
                                                phone: e.target.value,
                                            })
                                        }
                                    />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        label="И-Мэйл"
                                        sx={inputStyle}
                                        value={participantForm.email}
                                        onChange={(e) =>
                                            setParticipantForm({
                                                ...participantForm,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        label="Хаяг"
                                        sx={inputStyle}
                                        value={participantForm.address}
                                        onChange={(e) =>
                                            setParticipantForm({
                                                ...participantForm,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                    <TextField
                                        size="small"
                                        variant="outlined"
                                        label="Зураг"
                                        sx={inputStyle}
                                        value={participantForm.image}
                                        onChange={(e) =>
                                            setParticipantForm({
                                                ...participantForm,
                                                image: e.target.value,
                                            })
                                        }
                                    />

                                    <button
                                        onClick={handleAddParticipant}
                                        className="bg-green-600 w-[40%] py-2 rounded-md text-white font-medium text-[13px] transition-colors duration-300"
                                    >
                                        Оролцогч нэмэх
                                    </button>
                                </>
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
