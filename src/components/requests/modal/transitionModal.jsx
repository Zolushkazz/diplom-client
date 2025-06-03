'use client'

import { FormControl, InputLabel, Popover, Select, MenuItem } from "@mui/material"
import { useState, useEffect } from "react";
import { employeeAPI, requestAPI } from "../../api";

export const TransitionModal = ({open, setOpen, id, onSuccess}) => {
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        notes: '',
    });
    const [getWorkers, setGetWorkers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event) => {
         if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            setIsLoading(true);
            try {
                const response = await employeeAPI.getEmployees();
                setGetWorkers(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchEmployees();
    }, []);

     const handleSubmit = async (e) => {        
          e.preventDefault();
                setIsLoading(true);
                try {
                    const response = await requestAPI.shiftRequest({
                            shiftId: id,
                            receiverName: formData.name,
                        });
                if(response.status == 200 ||response.status == 201){
                    onSuccess()
                    handleClose();
                 }
                } catch (error) {
                    console.error('Error:', error);
                    setErrors(prev => ({
                        ...prev,
                        submit: error.message || 'Алдаа гарлаа. Дахин оролдоно уу.'
                    }));
                } finally {
                    setIsLoading(false);
                }
        
    }
    
    return (
        <Popover 
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            style={{ backgroundColor: "#3333" }}
            slotProps={{
                paper: {
                    style: {
                        transform: 'translateX(-25px) translateY(0%)',
                    },
                },
            }}
        >
            <div className="bg-white w-[450px] p-4 text-[13px]">
                <p>Хүсэлт шилжүүлэх</p>
                <p className="border-t my-2"></p>
                <FormControl fullWidth sx={{marginY: 3}}>
                    <InputLabel id="select-label" sx={{fontSize: 13}}>Хүсэлт авах ажилтан</InputLabel>
                    <Select 
                        name="name" 
                        labelId="select-label"
                        size="small" 
                        variant="outlined" 
                        label="Хүсэлт авах ажилтан" 
                        onChange={handleChange} 
                        value={formData.name}
                        sx={{
                            '& .MuiInputLabel-root': {fontSize: 13},
                            '& .MuiInputBase-input': {fontSize: 13},
                        }}
                        disabled={isLoading}
                    >
                        {getWorkers.map(item => (
                            <MenuItem key={item.id} sx={{fontSize:13}} value={item.name}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
    )
}