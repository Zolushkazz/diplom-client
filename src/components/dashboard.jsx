'use client'

import Navbar from "./navbar";
import LogoutModal from "./modal/logoutModal";
import { useState } from "react";

const DashboardLayout = ({ children, setActiveComponent, activeComponent }) => {
    const [open, setOpen] = useState(false)
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full bg-gray-100">
        <div className="flex flex-col h-[650px] justify-between w-1/5 p-3 m-3 text-[13px] rounded-lg bg-white overflow-auto">
          <div className="flex flex-col w-full p-6 gap-2">
            <button
              onClick={() => setActiveComponent("monitor")}
              className={`sidebar-btn ${activeComponent === "monitor" ? "active-btn" : ""}`}
            >
              Хянах самбар
            </button>
            <button
              onClick={() => setActiveComponent("activities")}
              className={`sidebar-btn ${activeComponent === "activities" ? "active-btn" : ""}`}
            >
              Үйл ажиллагаа
            </button>
            <button
              onClick={() => setActiveComponent("hr")}
              className={`sidebar-btn ${activeComponent === "hr" ? "active-btn" : ""}`}
            >
              Хүний нөөц
            </button>
            <button
              onClick={() => setActiveComponent("requests")}
              className={`sidebar-btn ${activeComponent === "requests" ? "active-btn" : ""}`}
            >
              Хүсэлтүүд
            </button>
          </div>
          <button onClick={()=>setOpen(true)} className="p-2 mx-6 bg-red-300 hover:bg-red-500 text-white rounded">Гарах</button>
        </div>
        <main className="flex-1 p-6 overflow-auto h-full">{children}</main>
      </div>
      {open && <LogoutModal open={open} setOpen={setOpen}/>}
    </>
  );
};

export default DashboardLayout;
