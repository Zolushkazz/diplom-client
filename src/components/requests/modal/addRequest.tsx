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
import { employeeAPI, requestAPI } from "../../api";

interface Employee {
    id: number;
    name: string;
}
export const AddRequest = ({
    open,
    setOpen,
    editData,
    onSuccess,
}) => {
    const [getWorkers, setGetWorkers] = useState<Employee[]>([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        notes: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name || "",
                startDate: editData.startDate || "",
                notes: editData.notes || "",
            });
        }
    }, [open, editData]);

    const handleClose = () => {
        setOpen(false);
        setFormData({
            name: "",
            startDate: "",
            notes: "",
        });
        setEditData(null);
        setErrors({});
        setEditData(null);
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            setIsLoading(true);
            try {
                const response = await employeeAPI.getEmployees();
                setGetWorkers(response.data);
                console.log("ressss", response);
            } catch (error) {
                console.error("Error fetching employees:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEmployees();
    }, []);

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
        const requiredFields = [
            { field: "notes", message: "Заавал бөглөнө үү!" },
            { field: "name", message: "Заавал сонгоно уу!" },
            { field: "startDate", message: "Заавал сонгоно уу!" },
        ];

        requiredFields.forEach(({ field, message }) => {
            if (!formData[field]) {
                newErrors[field] = message;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsLoading(true);
        // console.log("sd", process.env.REACT_APP_API_URL);

        try {
            let response;
            if (editData && editData.id) {
                response = await requestAPI.updateRequestById(editData.id, {
                    name: formData.name,
                    notes: formData.notes,
                    startDate: formData.startDate,
                });
            } else {
                response = await requestAPI.createRequest({
                    name: formData.name,
                    notes: formData.notes,
                    startDate: formData.startDate,
                });
            }

            console.log("Success:", response);
            onSuccess(true);
            handleClose();
        } catch (error) {
            console.error("Error:", error);
            setErrors((prev) => ({
                ...prev,
                submit: error.message || "Алдаа гарлаа. Дахин оролдоно уу.",
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
                <h2>{editData ? "Хүсэлт засах" : "Хүсэлт нэмэх"}</h2>
                <p className="border-b"></p>
                <div className="flex flex-col gap-3 py-5 px-8">
                    <FormControl fullWidth>
                        <InputLabel id="select-label" sx={{ fontSize: 13 }}>
                            Хүсэлт авах ажилтан
                        </InputLabel>
                        <Select
                            name="name"
                            labelId="select-label"
                            size="small"
                            variant="outlined"
                            label="Хүсэлт авах ажилтан"
                            onChange={handleChange}
                            value={formData.name}
                            sx={{
                                "& .MuiInputLabel-root": { fontSize: 13 },
                                "& .MuiInputBase-input": { fontSize: 13 },
                            }}
                            disabled={isLoading}
                        >
                            {getWorkers.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    sx={{ fontSize: 13 }}
                                    value={item.name}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            type="date"
                            name="startDate"
                            size="small"
                            variant="outlined"
                            value={formData.startDate}
                            onChange={handleChange}
                            disabled={isLoading}
                            InputLabelProps={{
                                shrink: true,
                                style: { fontSize: 13 },
                            }}
                            inputProps={{
                                style: { fontSize: 13 },
                            }}
                        />
                    </FormControl>

                    <FormControl fullWidth>
                        <TextField
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            size="small"
                            variant="outlined"
                            label="Товч тайлбар"
                            disabled={isLoading}
                            sx={{
                                "& .MuiInputLabel-root": { fontSize: 13 },
                                "& .MuiInputBase-input": { fontSize: 13 },
                            }}
                            multiline
                            rows={3}
                        />
                    </FormControl>
                </div>

                <div className="flex items-center justify-end font-semibold gap-3 p-3">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#015197] text-white px-2 py-1 flex items-center rounded-md hover:bg-[#014080] transition-colors"
                        disabled={isLoading}
                    >
                        Хадгалах
                    </button>
                    <button
                        onClick={handleClose}
                        className="text-[#015197] hover:text-[#014080] transition-colors"
                        disabled={isLoading}
                    >
                        Гарах
                    </button>
                </div>
            </div>
        </Popover>
    );
};
