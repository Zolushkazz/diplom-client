import React from "react";
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

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const Monitor = () => {
  const data = {
    labels: ["11-19", "11-20", "11-21", "11-22", "11-23", "11-24", "11-25", "11-26", "11-27", "11-28"],
    datasets: [
      {
        label: "Хэлтэс 1",
        data: [900, 950, 870, 860, 890, 920, 1000, 1100, 1150, 1200],
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
      {
        label: "Хэлтэс 2",
        data: [800, 850, 780, 770, 810, 830, 850, 870, 900, 920],
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        fill: true,
      },
      {
        label: "Хэлтэс 3",
        data: [700, 750, 710, 700, 740, 760, 780, 800, 820, 850],
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: true,
      },
      {
        label: "Хэлтэс 4",
        data: [600, 650, 620, 610, 630, 650, 670, 690, 710, 750],
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        fill: true,
      },
    ],
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
          <h3 className="font-semibold text-[11px]">Хамгийн бага үйл ажиллагаатай хэлтэс</h3>
          <p className="text-xl">Хэлтэс 2 - 3</p>
          <p className="text-red-500 text-[11px]">↓ - 5 <span className="text-black text-[11px]">өмнөх сараас</span></p>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="font-semibold text-[11px]">Хамгийн их үйл ажиллагаатай хэлтэс</h3>
          <p className="text-xl">Хэлтэс 1 - 4</p>
          <p className="text-blue-700 text-[11px]">↑ + 2 <span className="text-black text-[11px]">өмнөх сараас</span></p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="font-semibold text-[11px]">Нийт хийсэн үйл ажиллагаа</h3>
          <p className="text-xl">32</p>
          <p className="text-blue-700 text-[11px]">↑ + 2 <span className="text-black text-[11px]">өмнөх сараас</span></p>
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
          <li className="text-blue-500">🟦 Хэлтэс 1 - 10</li>
          <li className="text-green-500">🟩 Хэлтэс 2 - 7</li>
          <li className="text-red-500">🟥 Хэлтэс 3 - 5</li>
          <li className="text-orange-500">🟧 Хэлтэс 4 - 10</li>
        </ul>
      </div>
    </div>
  );
};

export default Monitor;
