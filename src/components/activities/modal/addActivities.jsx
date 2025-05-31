"use client";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import LoadingComponent from "../../LoadingComp";
import { useLoadingContext } from "../../LoadingProvider";

export const AddActivities = ({ open, setOpen, onSuccess, editData }) => {
    const { startLoading, stopLoading } = useLoadingContext();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        authorId: "",
        activityName: "",
        activityType: "",
        department: "",
    });

    const handleClose = () => {
        setFormData({
            authorId: "",
            activityName: "",
            activityType: "",
            department: "",
        });
        setErrors({});
        setOpen(false);
    };

    useEffect(() => {
        if (editData) {
            setFormData({
                authorId: editData.authorId || "",
                activityName: editData.activityName || "",
                activityType: editData.activityType || "",
                department: editData.department || "",
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.activityName)
            newErrors.activityName = "Үйл ажиллагааны нэр шаардлагатай!";
        if (!formData.activityType)
            newErrors.activityType = "Үйл ажиллагааны төрөл шаардлагатай!";
        if (!formData.department)
            newErrors.department = "Хэлтэс/газар шаардлагатай!";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:4000/activities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    authorId: formData.authorId,
                    activityName: formData.activityName,
                    activityType: formData.activityType,
                    department: formData.department,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Алдаа гарлаа");
            }
            if (response.status === 200)
                return startLoading("done", "Амжилттай дууслаа!");

            const result = await response.json();
            console.log("Success:", result);
            onSuccess();
            handleClose();
        } catch (error) {
            console.error("Full error:", error);
            setErrors((prev) => ({
                ...prev,
                submit: error.message || "Алдаа гарлаа. Дахин оролдоно уу.",
            }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Popover
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "center",
                }}
                style={{ backgroundColor: "#3333" }}
                slotProps={{
                    paper: {
                        style: {
                            transform: "translateX(-25px) translateY(0%)",
                        },
                    },
                }}
            >
                <div className="w-[440px] p-4 flex flex-col gap-3 text-[13px]">
                    <h2>Үйл ажиллагаа нэмэх</h2>
                    <p className="border-b"></p>
                    <div className="flex flex-col gap-3 py-5 px-8">
                        <TextField
                            name="activityName"
                            value={formData.activityName}
                            onChange={handleChange}
                            error={!!errors.activityName}
                            helperText={errors.activityName}
                            size="small"
                            variant="outlined"
                            label="Үйл ажиллагааны нэр"
                            sx={{
                                "& .MuiInputLabel-root": { fontSize: 13 },
                                "& .MuiInputBase-input": { fontSize: 13 },
                            }}
                        />
                        <FormControl
                            fullWidth
                            size="small"
                            error={!!errors.activityType}
                        >
                            <InputLabel
                                id="activityType-label"
                                sx={{
                                    backgroundColor: "white",
                                    fontSize: 13,
                                    transform: errors.activityType
                                        ? "translate(14px, -9px) scale(0.75)"
                                        : undefined,
                                }}
                            >
                                Үйл ажиллагааны төрөл
                            </InputLabel>
                            <Select
                                name="activityType"
                                value={formData.activityType}
                                onChange={handleChange}
                                labelId="activityType-label"
                                label="Хэлтэс"
                            >
                                <MenuItem value="Сургалт" sx={{ fontSize: 13 }}>
                                    Сургалт
                                </MenuItem>
                                <MenuItem
                                    value="Судалгаа"
                                    sx={{ fontSize: 13 }}
                                >
                                    Судалгаа
                                </MenuItem>
                                <MenuItem value="Хурал" sx={{ fontSize: 13 }}>
                                    Хурал
                                </MenuItem>
                            </Select>
                            {errors.activityType && (
                                <span
                                    style={{
                                        color: "#d32f2f",
                                        fontSize: "0.75rem",
                                        marginLeft: "14px",
                                        marginTop: "3px",
                                        display: "block",
                                        position: "relative",
                                        top: "-5px", // Move error message higher
                                    }}
                                >
                                    {errors.activityType}
                                </span>
                            )}
                        </FormControl>
                        <FormControl
                            fullWidth
                            size="small"
                            error={!!errors.department}
                        >
                            <InputLabel
                                id="department-label"
                                sx={{
                                    backgroundColor: "white",
                                    fontSize: 13,
                                    transform: errors.department
                                        ? "translate(14px, -9px) scale(0.75)"
                                        : undefined,
                                }}
                            >
                                Хийсэн газар хэлтэс
                            </InputLabel>
                            <Select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                labelId="department-label"
                                label="Хэлтэс"
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
                            {errors.department && (
                                <span
                                    style={{
                                        color: "#d32f2f",
                                        fontSize: "0.75rem",
                                        marginLeft: "14px",
                                        marginTop: "3px",
                                        display: "block",
                                        position: "relative",
                                        top: "-5px", // Move error message higher
                                    }}
                                >
                                    {errors.department}
                                </span>
                            )}
                        </FormControl>
                    </div>
                    {errors.submit && (
                        <div className="text-red-500 text-xs text-center mb-2">
                            {errors.submit}
                        </div>
                    )}
                    <div className="flex items-center justify-end font-semibold gap-3 p-3">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#015197] text-white px-2 py-1 flex items-center rounded-md hover:bg-[#014080] transition-colors"
                        >
                            {loading ? "Хадгалж байна..." : "Хадгалах"}
                        </button>
                        <button
                            onClick={handleClose}
                            className="text-[#015197] hover:text-[#014080] transition-colors"
                        >
                            Гарах
                        </button>
                    </div>
                </div>
            </Popover>
        </>
    );
};
