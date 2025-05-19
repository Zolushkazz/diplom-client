'use client'


import { useState } from "react";
import Activities from "./activities/activities";
import Requests from "./requests/requests";
import Monitor from "./monitor/monitor";
import HR from "./hr/hr";

export const Sidebar = () => {
    const [activeComponent, setActiveComponent] = useState("monitor");

  const renderContent = () => {
    switch (activeComponent) {
      case "monitor":
        return <Monitor />;
      case "activities":
        return <Activities />;
      case "hr":
        return <HR />;
      case "requests":
        return <Requests />;

      default:
        return <Monitor />;
    }
  };
    return(
        <div className="flex">
        <div className="flex flex-col h-[90vh] w-[270px] p-3 m-3 text-[13px] rounded-lg bg-white overflow-auto">
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
        <div className="py-6 pl-3 w-full">
        {renderContent()}
        </div>
        </div>
    )
}