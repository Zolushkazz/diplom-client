'use client'

import { FormControl, InputLabel, MenuItem, Popover, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import LoadingComponent from "../../LoadingComp";

export const AddWorker = ({open, setOpen}) => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        lastName: '',
        department: '',
        role: '',
        email: '',
        phone: ''
    });

    const handleClose = () => {
        setFormData({
            username: '',
            password: '',
            name: '',
            lastName: '',
            department: '',
            role: '',
            email: '',
            phone: ''
        });
        setErrors({});
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        console.log('Form data updated:', formData);
    }, [formData]);

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            { field: 'name', message: 'Заавал бөглөнө үү!' },
            { field: 'lastName', message: 'Заавал бөглөнө үү!' },
            { field: 'department', message: 'Заавал сонгоно уу!' },
            { field: 'role', message: 'Заавал сонгоно уу!' },
        ];
      
        requiredFields.forEach(({ field, message }) => {
            if (!formData[field]) {
                newErrors[field] = message;
            }
        });
      
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Хүчинтэй имэйл хаяг оруулна уу!';
        }
      
        if (formData.phone && !/^[0-9]{8}$/.test(formData.phone)) {
            newErrors.phone = 'Зөв утасны дугаар оруулна уу! (8 оронтой)';
        }
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        console.log("sd", process.env.REACT_APP_API_URL);
        
        try {
          const response = await fetch(`http://localhost:4000/employees`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
               'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                username: formData.username || undefined,
                password: formData.password || undefined,
                name: formData.name,
                lastName: formData.lastName,
                department: formData.department,
                role: formData.role,
                email: formData.email || undefined,
                phone: formData.phone || undefined,
              }),
          });
      
          console.log('Raw response:', response);
          
          if (!response.ok) {
            const errorData = await response.json();
            console.log("res",response);
            
            
            throw new Error( 'Алдаа гарлаа' || errorData.message);
          }
      
          
          const result = await response.json();
          console.log('Success:', result);
          handleClose();
        } catch (error) {
          console.error('Full error:', error);
          setErrors(prev => ({
            ...prev,
            submit: error.message || 'Алдаа гарлаа. Дахин оролдоно уу.'
          }));
        } finally {
            setLoading(false); 
        }
      }

    return(
        <>
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
            <div className="w-[440px] p-4 flex flex-col gap-3 text-[13px]">
                <h2>Ажилтан нэмэх</h2>
                <p className="border-b"></p>
                <div className="flex flex-col gap-3 py-5 px-8">
                    <TextField 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        error={!!errors.name}
                        helperText={errors.name}
                        size="small" 
                        variant="outlined" 
                        label="Нэр"  
                        sx={{
                            '& .MuiInputLabel-root': {fontSize: 13},
                            '& .MuiInputBase-input': {fontSize: 13},
                        }}
                    />
                    <TextField 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        size="small" 
                        variant="outlined" 
                        label="Овог" 
                        sx={{
                            '& .MuiInputLabel-root': {fontSize: 13},
                            '& .MuiInputBase-input': {fontSize: 13},
                        }} 
                    />
                    <FormControl fullWidth size="small" error={!!errors.department}>
                        <InputLabel 
                            id="department-label" 
                            sx={{
                                backgroundColor: "white", 
                                fontSize: 13,
                                transform: errors.department ? 'translate(14px, -9px) scale(0.75)' : undefined
                            }}
                        >
                            Хэлтэс
                        </InputLabel>
                        <Select 
                            name="department" 
                            value={formData.department} 
                            onChange={handleChange}
                            labelId="department-label"
                            label="Хэлтэс"
                        >
                            <MenuItem value="Мэдээлэл технологийн хэлтэс" sx={{fontSize: 13}}>
                                Мэдээлэл технологийн хэлтэс
                            </MenuItem>
                            <MenuItem value="Захиргааны хэлтэс" sx={{fontSize: 13}}>
                                Захиргааны хэлтэс
                            </MenuItem>
                            <MenuItem value="Төсөл менежментийн хэлтэс" sx={{fontSize: 13}}>
                                Төсөл менежментийн хэлтэс
                            </MenuItem>
                        </Select>
                        {errors.department && (
                            <span style={{ 
                                color: '#d32f2f', 
                                fontSize: '0.75rem',
                                marginLeft: '14px',
                                marginTop: '3px',
                                display: 'block',
                                position: 'relative',
                                top: '-5px' // Move error message higher
                            }}>
                                {errors.department}
                            </span>
                        )}
                    </FormControl>
                    <FormControl fullWidth size="small" error={!!errors.role}>
                        <InputLabel 
                            id="role-label" 
                            sx={{
                                backgroundColor: "white", 
                                fontSize: 13,
                                transform: errors.role ? 'translate(14px, -9px) scale(0.75)' : undefined
                            }}
                        >
                            Эрхийн төрөл
                        </InputLabel>
                        <Select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange}
                            labelId="role-label"
                            label="Эрхийн төрөл"
                            fontSize='13px'
                        >
                            <MenuItem value="Админ" sx={{fontSize: 13}}>Админ</MenuItem>
                            <MenuItem value="Зохион байгуулагч" sx={{fontSize: 13}}>Зохион байгуулагч</MenuItem>
                            <MenuItem value="Оролцогч" sx={{fontSize: 13}}>Оролцогч</MenuItem>
                        </Select>
                        {errors.role && (
                            <span style={{ 
                                color: '#d32f2f', 
                                fontSize: '0.75rem',
                                marginLeft: '14px',
                                marginTop: '3px',
                                display: 'block',
                                position: 'relative',
                                top: '-5px' // Move error message higher
                            }}>
                                {errors.role}
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
                        Хадгалах
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