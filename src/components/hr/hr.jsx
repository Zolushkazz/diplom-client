'use client'

import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { Add, DeleteOutline, PrintTwoTone } from "@mui/icons-material";
import { AddWorker } from "./modal/addWorker";
import { employeeAPI } from "../api";
import { useNavigate } from 'react-router-dom';
import { useRouter } from "next/router";
import Link from 'next/link';
import LoadingComponent from "../LoadingComp";



const employees = [
    { name: "Анар", lastName: "Бат", department: "Хэлтэс 1", role: "Оролцогч", email: "a@gmail.com", phone: "99999999" },
    { name: "Бадрал", lastName: "Болд", department: "Хэлтэс 1", role: "Зохион байгуулагч", email: "b@gmail.com", phone: "99999999" },
    { name: "Эрдэнэ", lastName: "Хангай", department: "Хэлтэс 1", role: "Зохион байгуулагч", email: "e@gmail.com", phone: "99999999" },
  ];

const HR = () => {
  const [year, setYear] = useState("2024");
  const [search, setSearch] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false)
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 


  const router = useRouter();

  const handleRowClick = (row) => {
    router.push({
      pathname: '/more',
      query: {
        id: row.id,
      },
    });
  };


  useEffect(() => {
    const fetchEmployees = async () => {
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
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true); 
  
    try {
      const response = await employeeAPI.deleteEmployee(id); 
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
  
      console.log("Employee deleted successfully:", response.data);
    } catch (error) {
      setError("Error deleting employee"); 
    } finally {
      setLoading(false); 
    }
  };
  


  return (
    <>
     {loading ? 
            <LoadingComponent/> :
            (
              <>
    <div className="p-4 px-8 bg-white rounded-lg h-[93%]">     
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
            <h2 className="font-semibold text-[13px]">Ажилчид</h2>
          <Select value={year} onChange={(e) => setYear(e.target.value)} className="h-7">
            <MenuItem fontSize="13px" value="2025">2025</MenuItem>
            <MenuItem fontSize="13px" value="2024">2024</MenuItem>
            <MenuItem fontSize="13px" value="2023">2023</MenuItem>
          </Select>
        </div>
        <div className="flex items-center gap-3">
        <div className="flex items-center px-2 relative">
          <TextField
            placeholder="Хайлт"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            size="small"
            sx={{fontSize: 13}}
          />
          <SearchIcon sx={{position: "absolute", top: 8, right: 10}} />
        </div>
        <Add onClick={()=>setOpenAddModal(true)} className="cursor-pointer" sx={{color:"gray"}} />
        <PrintTwoTone sx={{color:"gray"}}/>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-b py-3 border-gray-300 text-[13px]">
          <thead className="text-[#015197] ">
            <tr>
              <th className="text-left p-2">Нэр</th>
              <th className="text-left p-2">Овог</th>
              <th className="text-left p-2">Хэлтэс</th>
              <th className="text-left p-2">Эрхийн төрөл</th>
              <th className="text-left p-2">Имэйл</th>
              <th className="text-left p-2">Утас</th>
              <th className="text-left p-2">Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((row) => (
                <tr key={row.id}className="hover:bg-gray-50 cursor-pointer">
                  {/* <td className="border-b p-2 flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        row.status === "green" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {row.id}
                  </td> */}
                  <td onClick={() => handleRowClick(row)} className="border-t p-2">{row.name}</td>
                  <td onClick={() => handleRowClick(row)} className="border-t p-2">{row.lastName}</td>
                  <td onClick={() => handleRowClick(row)} className="border-t p-2">{row.department}</td>
                  <td onClick={() => handleRowClick(row)} className="border-t p-2">{row.role}</td>
                  <td onClick={() => handleRowClick(row)} className="border-t p-2">{row?.email ? row?.email : <span className="text-[#ccc]">xxx@example.com</span>}</td>
                  <td onClick={() => handleRowClick(row)} className="border-t p-2">{row?.phone ? row?.phone : <span className="text-[#ccc]">99999999</span>}</td>
                  <td className="border-t p-2 flex gap-2">
                  {/* <Link key={row.id} href={`/more`}>
                    <EditOutlinedIcon sx={{color: "gray", cursor: "pointer"}}/>
                  </Link> */}
                    <DeleteOutline onClick={() => handleDelete(row.id)} sx={{color: "gray", cursor: "pointer"}}/>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
    </div>
    <AddWorker open={openAddModal} setOpen={setOpenAddModal} />
              </>
            )}
    </>
  );
};

export default HR;
