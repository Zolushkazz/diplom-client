import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { Add, DeleteOutline, PrintTwoTone } from "@mui/icons-material";

const requests = [
    {
      requester: "Солонго",
      registeredEmployee: "Анар",
      department: "Хэлтэс 1",
      requestType: "Хүний нөөц",
      description: "Сургалт",
      registeredDate: "2024-11-11",
      responseDate: "2024-11-11",
    },
    {
      requester: "Мөнхжин",
      registeredEmployee: "Баатар",
      department: "Хэлтэс 1",
      requestType: "Үйл ажиллагаа",
      description: "Судалгаа",
      registeredDate: "2024-11-11",
      responseDate: "2024-11-11",
    },
    {
      requester: "Нэгхүн",
      registeredEmployee: "Эрдэнэ",
      department: "Хэлтэс 1",
      requestType: "Үйл ажиллагаа",
      description: "Хурал",
      registeredDate: "2024-12-11",
      responseDate: "2024-11-21",
    },
  ];

const Requests = () => {
  const [year, setYear] = useState("2024");
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 bg-white rounded-lg h-[93%]">     
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
            <h2 className="font-semibold text-[13px]">Хүсэлтүүд</h2>
          <Select value={year} onChange={(e) => setYear(e.target.value)} className="h-8">
            <MenuItem value="2024">2024</MenuItem>
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2022">2022</MenuItem>
          </Select>
        </div>
        <div className="flex items-center gap-3">
        <div className="flex items-center border rounded px-2">
          <TextField
            placeholder="Хайлт"
            variant="standard"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="h-[30px]"
          />
          <SearchIcon />
        </div>
        <Add/>
        <PrintTwoTone/>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-[13px]">
          <thead className="text-[#015197]">
            <tr>
            <th className="border p-2">Төлөв</th>
            <th className="border p-2">Хүлээн авагч</th>
            <th className="border p-2">Бүртгэсэн ажилтан</th>
            <th className="border p-2">Хэлтэс</th>
            <th className="border p-2">Хүсэлтийн төрөл</th>
            <th className="border p-2">Товч тайлбар</th>
            <th className="border p-2">Бүртгэсэн огноо</th>
            <th className="border p-2">Хариу авах огноо</th>
            </tr>
          </thead>
          <tbody>
             {requests.map((request, index) => (
               <tr key={index} className="border">
              <td className="border p-2 text-center">{request.status}</td>
              <td className="border p-2">{request.requester}</td>
              <td className="border p-2">{request.registeredEmployee}</td>
              <td className="border p-2">{request.department}</td>
              <td className="border p-2">{request.requestType}</td>
              <td className="border p-2">{request.description}</td>
              <td className="border p-2">{request.registeredDate}</td>
              <td className="border p-2">{request.responseDate}</td>
               </tr>
             ))}
          </tbody>
        </table>
    </div>
    </div>
  );
};

export default Requests;
