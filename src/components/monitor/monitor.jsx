"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";
import { activityApi, employeeAPI } from "../api";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
);

const Monitor = () => {
    const [departments, setDepartments] = useState([]);
    const [departmentCounts, setDepartmentCounts] = useState({});

    const fetchDepartments = useCallback(async () => {
        try {
            const response = await activityApi.getActivities();
            console.log("ressss", response);

            const departmentsRaw = response.data.map(
                (item) => item.department || "Тодорхойгүй"
            );

            const countsMap = {};
            departmentsRaw.forEach((dept) => {
                countsMap[dept] = (countsMap[dept] || 0) + 1;
            });

            const uniqueDepartments = Object.keys(countsMap);

            setDepartments(uniqueDepartments);
            setDepartmentCounts(countsMap);
            console.log("departments", uniqueDepartments);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    // Dummy data - Жишээ дата
    const dummyData = [900, 950, 870, 860, 890, 920, 1000, 1100, 1150, 1200];

    const departmentActivityTotals = departments.map((dept, index) =>
        dummyData.reduce((sum, val) => sum + (val - index * 100), 0)
    );

    const maxActivityIndex = departmentActivityTotals.indexOf(
        Math.max(...departmentActivityTotals)
    );
    const minActivityIndex = departmentActivityTotals.indexOf(
        Math.min(...departmentActivityTotals)
    );

    const maxCount = Math.max(...Object.values(departmentCounts));
    const minCount = Math.min(...Object.values(departmentCounts));

    const maxDepartments = departments.filter(
        (d) => departmentCounts[d] === maxCount
    );
    const minDepartments = departments.filter(
        (d) => departmentCounts[d] === minCount
    );

    const totalCount = Object.values(departmentCounts).reduce(
        (a, b) => a + b,
        0
    );

    // Ирсэн department бүрд dataset үүсгэх
    const datasets = departments.map((dept, index) => {
        // Өнгөний жагсаалт
        const colors = ["blue", "green", "red", "orange", "purple", "cyan"];
        const color = colors[index % colors.length];

        return {
            label: dept || `Хэлтэс ${index + 1}`,
            data: dummyData.map((v) => v - index * 100), // Жишээ дата өөрчлөх
            borderColor: color,
            backgroundColor: `${
                color === "blue"
                    ? "rgba(0,0,255,0.2)"
                    : color === "green"
                    ? "rgba(0,255,0,0.2)"
                    : color === "red"
                    ? "rgba(255,0,0,0.2)"
                    : color === "orange"
                    ? "rgba(255,165,0,0.2)"
                    : "rgba(0,0,0,0.2)"
            }`,
            fill: true,
        };
    });

    const data = {
        labels: [
            "11-19",
            "11-20",
            "11-21",
            "11-22",
            "11-23",
            "11-24",
            "11-25",
            "11-26",
            "11-27",
            "11-28",
        ],
        datasets: datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true },
            tooltip: { enabled: true },
        },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true },
        },
    };

    return (
        <div className="h-full">
            {/* Top Charts */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <h3 className="font-semibold text-[11px]">
                        Хамгийн бага үйл ажиллагаатай хэлтэс
                    </h3>
                    <p className="text-xl">{departments[1] || "N/A"}</p>
                    <p className="text-red-500 text-[11px]">
                        ↓ - 5{" "}
                        <span className="text-black text-[11px]">
                            өмнөх сараас
                        </span>
                    </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <h3 className="font-semibold text-[11px]">
                        Хамгийн их үйл ажиллагаатай хэлтэс
                    </h3>
                    <p className="text-xl">{departments[0] || "N/A"}</p>
                    <p className="text-blue-700 text-[11px]">
                        ↑ + 2{" "}
                        <span className="text-black text-[11px]">
                            өмнөх сараас
                        </span>
                    </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg">
                    <h3 className="font-semibold text-[11px]">
                        Нийт хийсэн үйл ажиллагаа
                    </h3>
                    <p className="text-xl">{totalCount}</p>
                    <p className="text-blue-700 text-[11px]">
                        ↑ + 2{" "}
                        <span className="text-black text-[11px]">
                            өмнөх сараас
                        </span>
                    </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg col-span-3">
                    <h3 className="font-semibold">Өмнөх сарын үйл ажиллагаа</h3>
                    <div className="h-64">
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>

            {/* Legend Section */}
            <div className="mt-6 bg-white p-4 rounded-xl shadow-lg">
                <h3 className="font-semibold">Хэлтэс</h3>
                <ul className="mt-2">
                    {departments.map((dept, index) => {
                        const colors = ["🟦", "🟩", "🟥", "🟧", "🟪", "🟦‍⬛"];
                        return (
                            <li key={index} className="flex items-center">
                                <span className="mr-2">
                                    {colors[index % colors.length]}
                                </span>
                                {dept || `Хэлтэс ${index + 1}`} -{" "}
                                {10 - index * 2}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Monitor;
