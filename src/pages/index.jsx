import { useState } from "react";
import DashboardLayout from "../components/dashboard";
import Monitor from "../components/monitor/monitor";
import Requests from "../components/requests/requests";
import HR from "../components/hr/hr";
import Activities from "../components/activities/activities";


const MainPage = () => {
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

  return <DashboardLayout setActiveComponent={setActiveComponent} activeComponent={activeComponent}>{renderContent()}</DashboardLayout>;
};

export default MainPage;
