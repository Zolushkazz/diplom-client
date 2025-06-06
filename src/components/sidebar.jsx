"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import Requests from "./requests/requests";
import Monitor from "./monitor/monitor";
import HR from "./hr/hr";
import { userAPI } from "./api";

export const Sidebar = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();

    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [userRole, setUserRole] = useState();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await userAPI.getProfile();
                console.log("res", response);

                setProfile(response.data.data);
                setUserRole(response.data.data.role);
            } catch (err) {
                setError("Profile авахад алдаа гарлаа!");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // console.log(profile, ro);

    const [activeComponent, setActiveComponent] = useState("monitor");

    useEffect(() => {
        if (pathname === "/") setActiveComponent("monitor");
        else if (pathname.includes("/activities"))
            setActiveComponent("activities");
        else if (pathname.includes("/hr")) setActiveComponent("hr");
        else if (pathname.includes("/requests")) setActiveComponent("requests");
    }, [pathname]);

    const handleSidebarClick = (component) => {
        setActiveComponent(component);
        router.push(component === "monitor" ? "/" : `/${component}`);
    };

    const renderContent = () => {
        switch (activeComponent) {
            case "monitor":
                return <Monitor />;
            case "activities":
            case "hr":
            case "requests":
                router.push(`/${activeComponent}`);
                return null;
            default:
                router.push("/");
                return null;
        }
    };

    return (
        <div className="flex w-full bg-gray-100">
            <aside className="flex flex-col justify-between h-[90vh] w-[270px] p-3 m-3 text-[13px] rounded-lg bg-white overflow-auto">
                <div className="flex flex-col w-full p-3 gap-3">
                    {[
                        { label: "Хянах самбар", value: "monitor" },
                        { label: "Үйл ажиллагаа", value: "activities" },
                        { label: "Хүний нөөц", value: "hr" },
                        { label: "Хүсэлтүүд", value: "requests" },
                    ].map(({ label, value }) => (
                        <button
                            key={value}
                            onClick={() => handleSidebarClick(value)}
                            className={`sidebar-btn ${
                                activeComponent === value ? "active-btn" : ""
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                <button className="p-2 mx-6 bg-red-300 hover:bg-red-500 text-white rounded">
                    Гарах
                </button>
            </aside>

            <main className="py-3 pl-3 pr-5 w-full">
                {children || renderContent()}
            </main>
        </div>
    );
};
