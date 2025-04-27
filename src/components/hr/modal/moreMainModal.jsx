'use client'

import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { employeeAPI } from '../../api'
import { useRouter } from 'next/router'
import LoadingComponent from '../../LoadingComp'

const labelStyle = {
  backgroundColor: 'white',
  fontSize: 13,
}
const inputStyle = {
  '& .MuiInputLabel-root': { fontSize: 13, width: 220 },
  '& .MuiInputBase-input': { fontSize: 13, width: 220 },
}

const locations = {
  "Улаанбаатар": ["Баянзүрх", "Сонгинохайрхан", "Хан-Уул", "Баянгол", "Сүхбаатар", "Чингэлтэй", "Налайх", "Багануур", "Багахангай"],
  "Архангай": ["Цэцэрлэг", "Жаргалант", "Ихтамир", "Төвшрүүлэх", "Хашаат", "Хотонт"],
  "Баян-Өлгий": ["Өлгий", "Алтанцөгц", "Булган", "Цэнгэл"],
  "Баянхонгор": ["Баянхонгор", "Галуут", "Баян-Овоо", "Жинст"],
  "Булган": ["Булган", "Сэлэнгэ", "Орхон", "Хутаг-Өндөр"],
  "Говь-Алтай": ["Есөнбулаг", "Тонхил", "Дарви", "Төгрөг"],
  "Говьсүмбэр": ["Сүмбэр", "Баяндэлгэр", "Шивээговь"],
  "Дархан-Уул": ["Дархан", "Хонгор", "Орхон", "Шарынгол"],
  "Дорноговь": ["Сайншанд", "Айраг", "Дэлгэрэх", "Замын-Үүд"],
  "Дорнод": ["Чойбалсан", "Баянтүмэн", "Хөлөнбуйр"],
  "Дундговь": ["Мандалговь", "Гурвансайхан", "Дэлгэрцогт"],
  "Завхан": ["Улиастай", "Идэр", "Яруу", "Тосонцэнгэл"],
  "Орхон": ["Баян-Өндөр", "Жаргалант"],
  "Өвөрхангай": ["Арвайхээр", "Баянгол", "Богд", "Тарагт"],
  "Өмнөговь": ["Даланзадгад", "Булган", "Цогтцэций"],
  "Сүхбаатар": ["Баруун-Урт", "Асгат", "Түмэнцогт"],
  "Сэлэнгэ": ["Сүхбаатар", "Зүүнбүрэн", "Мандал"],
  "Төв": ["Зуунмод", "Баян", "Баяндэлгэр"],
  "Увс": ["Улаангом", "Тариалан", "Өндөрхангай"],
  "Ховд": ["Ховд", "Булган", "Мянгад"],
  "Хэнтий": ["Өндөрхаан", "Батширээт", "Баянхутаг"],
  "Хөвсгөл": ["Мөрөн", "Тариалан", "Цэцэрлэг"],
};

export const MoreMainModal = ({ open, setOpen, data }) => {
  const handleClose = () => setOpen(false)

    const router = useRouter();
  

  // States to store form values
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    familyName: data?.familyName,
    birthDate: data?.birthDate,
    gender: data?.gender,
    province: data?.province,
    district: data?.district,
    username: data?.email,
    major: data?.major,
    phone: data?.phone,
    workPhone: data?.phone,
    email: data?.email,
    role: data?.role,
    address: data?.address,
  })

  console.log("emp data", employeeData);
  

  // Populate form fields with data when the modal opens
  useEffect(() => {
    if (data) {
      console.log("pro data", data);
      
      setEmployeeData({
        ...data,
        province: data.province || '',
        district: data.district || '',
      })
      setSelectedProvince(data.province || '')
      setSelectedDistrict(data.district || '')
    }
  }, [data])

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setEmployeeData((prevData) => ({
      ...prevData,
      province: province,
    }));
  
    // Reset district when province changes
    setSelectedDistrict('');
    setEmployeeData((prevData) => ({
      ...prevData,
      district: '', // Reset district when province is changed
    }));
  };
  
  // Handle district change
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setEmployeeData((prevData) => ({
      ...prevData,
      district: district,
    }));
  };

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const res = await employeeAPI.updateEmployeeById(data?.id, employeeData);
      if (res.status === 200) {
        setOpen(false);
        router.push('/')
      } else {
        console.error("Failed to save employee data", res);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
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
      anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
      transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      style={{ backgroundColor: '#3333' }}
      slotProps={{
        paper: {
          style: {
            transform: 'translateX(-25px) translateY(0%)',
          },
        },
      }}
    >
      <div className="w-[900px] p-4 flex flex-col gap-3 text-[13px]">
        <h2>Ажилтны дэлгэрэнгүй мэдээлэл засах</h2>
        <p className="border-b" />

        <div className="flex gap-6 py-5 w-full px-8">
          <div className="flex flex-col gap-3 w-1/2">
            <h2 className="text-[15px] font-semibold">Үндсэн мэдээлэл</h2>

            <div className="flex items-center gap-6">
              <Avatar sx={{ width: 110, height: 110, boxShadow: 2 }} />
              <button className="border px-2 py-1 h-8 rounded-sm border-[#b5b5b5]">Зураг оруулах</button>
            </div>

            <TextField
              size="small"
              variant="outlined"
              label="Ургийн овог"
              sx={inputStyle}
              value={employeeData.familyName}
              onChange={(e) => setEmployeeData({ ...employeeData, familyName: e.target.value })}
            />
            <div className="flex flex-col gap-1">
              <label className="text-gray-700 text-sm mb-1">Төрсөн өдөр</label>
              <input
                type="date"
                className="border p-2 border-[#b5b5b5] rounded-sm"
                value={employeeData.birthDate}
                onChange={(e) => setEmployeeData({ ...employeeData, birthDate: e.target.value })}
              />
            </div>

            <FormControl width={"220px"} size="small">
              <InputLabel sx={labelStyle}>Хүйс</InputLabel>
              <Select
                value={employeeData.gender}
                onChange={(e) => setEmployeeData({ ...employeeData, gender: e.target.value })}
                fontSize="13px"
              >
                <MenuItem value="male" sx={{ fontSize: 13 }}>Эр</MenuItem>
                <MenuItem value="female" sx={{ fontSize: 13 }}>Эм</MenuItem>
              </Select>
            </FormControl>

            <FormControl width={"220px"} size="small">
              <InputLabel sx={labelStyle}>Төрсөн аймаг, хот</InputLabel>
              <Select
                value={selectedProvince}
                onChange={handleProvinceChange}
                fontSize="13px"
              >
                {Object.keys(locations).map((province) => (
                  <MenuItem key={province} value={province} sx={{ fontSize: 13 }}>
                    {province}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" disabled={!selectedProvince}>
              <InputLabel sx={labelStyle}>Төрсөн сум дүүрэг</InputLabel>
              <Select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                fontSize="13px"
              >
                {(locations[selectedProvince] || []).map((district) => (
                  <MenuItem key={district} value={district} sx={{ fontSize: 13 }}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex flex-col gap-4 w-1/2">
            <h2 className="text-[15px] font-semibold">Системийн мэдээлэл</h2>
            <TextField
              size="small"
              variant="outlined"
              label="Нэвтрэх нэр"
              sx={inputStyle}
              value={employeeData.username}
              onChange={(e) => setEmployeeData({ ...employeeData, username: e.target.value })}
            />
            <TextField
              size="small"
              variant="outlined"
              label="Мэргэжил"
              sx={inputStyle}
              value={employeeData.major}
              onChange={(e) => setEmployeeData({ ...employeeData, major: e.target.value })}
            />
            <FormControl fullWidth size="small">
              <InputLabel sx={labelStyle}>Эрхийн төрөл</InputLabel>
              <Select
                value={employeeData.role}
                onChange={(e) => setEmployeeData({ ...employeeData, role: e.target.value })}
                fontSize="13px"
              >
                <MenuItem value="Админ" sx={{fontSize: 13}}>Админ</MenuItem>
                <MenuItem value="Зохион байгуулагч" sx={{fontSize: 13}}>Зохион байгуулагч</MenuItem>
                <MenuItem value="Оролцогч" sx={{fontSize: 13}}>Оролцогч</MenuItem>
              </Select>
            </FormControl>

            <h2 className="text-[15px] font-semibold">Холбоо барих мэдээлэл</h2>
            <TextField
              size="small"
              variant="outlined"
              label="Гар утас"
              sx={inputStyle}
              value={employeeData.phone}
              onChange={(e) => setEmployeeData({ ...employeeData, phone: e.target.value })}
            />
            <TextField
              size="small"
              variant="outlined"
              label="Ажлын утас"
              sx={inputStyle}
              value={employeeData.workPhone}
              onChange={(e) => setEmployeeData({ ...employeeData, workPhone: e.target.value })}
            />
            <TextField
              size="small"
              variant="outlined"
              label="И-мэйл"
              sx={inputStyle}
              value={employeeData.email}
              onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
            />
            <TextField
              size="small"
              variant="outlined"
              label="Хаяг"
              sx={inputStyle}
              value={employeeData.address}
              onChange={(e) => setEmployeeData({ ...employeeData, address: e.target.value })}
            />
          </div>
        </div>

        <div className="flex items-center justify-end font-semibold gap-3 p-3">
          <button
            onClick={handleSaveClick}
            className="bg-[#015197] text-white px-2 py-1 flex items-center rounded-md"
          >
            Хадгалах
          </button>
          <button onClick={handleClose} className="text-[#015197]">
            Гарах
          </button>
        </div>
      </div>
    </Popover>
    </>
  )
}
