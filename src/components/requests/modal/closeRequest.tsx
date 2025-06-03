'use client'

import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Popover,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { requestAPI } from '../../api';

export const CloseTransitionModal = ({ open, setOpen,id, onSave }) => {
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        state: '',
        notes: '',
    });
    const handleClose = () => {
        setOpen(false);
    };

     const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };
   const handleSubmit = async (e) => {        
            e.preventDefault();
                  setIsLoading(true);
                  try {
                      const response = await requestAPI.closeShift({
                              id: id,
                              state: formData.state,
                          });
                  if(response.status == 200 ||response.status == 201){
                    //   onSuccess()
                      handleClose();
                   }
                  } catch (error) {
                      console.error('Error:', error);
                    //   setErrors(prev => ({
                    //       ...prev,
                    //       submit: error.message || 'Алдаа гарлаа. Дахин оролдоно уу.'
                    //   }));
                  } finally {
                      setIsLoading(false);
                  }
          
      }

    const options = [
        { label: 'Цуцалсан', value: 'cancelled' },
        { label: 'Хаасан', value: 'closed' },
    ];

    return (
        <Popover
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
            transformOrigin={{ vertical: 'center', horizontal: 'center' }}
            slotProps={{
                paper: {
                    style: {
                        transform: 'translateX(-25px) translateY(0%)',
                    },
                },
            }}
        >
            <div className="bg-white w-[450px] p-4 text-[13px]">
                <p className="font-medium py-2">Хүсэлт хаах</p>
                <p className="border-t my-2"></p>

                <FormControl fullWidth size="small" className="mb-4">
                    <InputLabel id="request-close-select-label">Төлөв</InputLabel>
                    <Select
                    name='state'
                        labelId="request-close-select-label"
                        value={formData.state}
                        onChange={(e) => handleChange("state", e.target.value)}
                        label="Төлөв"
                        size="small" 
                        variant="outlined" 
                        sx={{   
                            '& .MuiInputLabel-root': {fontSize: 13},
                            '& .MuiInputBase-input': {fontSize: 13},
                        }}
                        className='mb-4'
                    >
                        {options.map((opt) => (
                            <MenuItem key={opt.value} value={opt.label}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                name='note'
                    label="Тайлбар"
                    multiline
                    minRows={3}
                    fullWidth
                    size="small"
                    value={formData.notes}
                    onChange={(e) => handleChange("notes", e.target.value)}
                />

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
