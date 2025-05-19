'use client'

import Navbar from "./navbar";
import LogoutModal from "./modal/logoutModal";
import { useState } from "react";
import { Sidebar } from "./sidebar";

const DashboardLayout = ({ children, setActiveComponent, activeComponent }) => {
    const [open, setOpen] = useState(false)
  return (
    <>
      <Navbar />
      <div className="flex h-screen w-full bg-gray-100">
        <Sidebar/>
        {/* <main className="p-6 overflow-auto h-full">{children}</main> */}
      </div>
      {open && <LogoutModal open={open} setOpen={setOpen}/>}
    </>
  );
};

export default DashboardLayout;
