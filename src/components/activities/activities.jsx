import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Add, DeleteOutline, PrintTwoTone } from "@mui/icons-material";

const data = [
  {
    id: "2024-1",
    name: "Сургалт 1",
    type: "Сургалт",
    registeredBy: "Анхаар",
    location: "Хэлтэс 1",
    date: "2024-11-11",
    status: "green",
  },
  {
    id: "2024-2",
    name: "Судалгаа 2",
    type: "Судалгаа",
    registeredBy: "Бадрал",
    location: "Хэлтэс 2",
    date: "2024-11-11",
    status: "red",
  },
  {
    id: "2024-3",
    name: "Хурал 3",
    type: "Хурал",
    registeredBy: "Эрдэнэ",
    location: "Хэлтэс 3",
    date: "2024-11-11",
    status: "red",
  },
];

const Activities = () => {
  const [year, setYear] = useState("2024");
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 bg-white rounded-lg h-[93%]">     
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
            <h2 className="font-semibold text-[13px]">Үйл ажиллагаанууд</h2>
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
              <th className="border p-2">Дугаар</th>
              <th className="border p-2">Үйл ажиллагааны нэр</th>
              <th className="border p-2">Үйл ажиллагааны төрөл</th>
              <th className="border p-2">Бүртгэсэн ЗБ</th>
              <th className="border p-2">Хийсэн газар, хэлтэс</th>
              <th className="border p-2">Бүртгэсэн огноо</th>
              <th className="border p-2">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="border-b p-2 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        row.status === "green" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {row.id}
                  </td>
                  <td className="border p-2">{row.name}</td>
                  <td className="border p-2">{row.type}</td>
                  <td className="border p-2">{row.registeredBy}</td>
                  <td className="border p-2">{row.location}</td>
                  <td className="border p-2">{row.date}</td>
                  <td className="border-t p-2 flex gap-2">
                    <EditOutlinedIcon/>
                    <DeleteOutline/>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
    </div>
  );
};

export default Activities;
