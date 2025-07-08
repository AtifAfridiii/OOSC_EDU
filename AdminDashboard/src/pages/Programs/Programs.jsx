import React from "react";
import StatsCards from "../../components/StatsCards";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'


export default function Programs() {

    const trendData = [
        { year: '2019', value: 4.2 },
        { year: '2020', value: 4.5 },
        { year: '2021', value: 4.8 },
        { year: '2022', value: 4.6 },
        { year: '2023', value: 4.9 },
        { year: '2024', value: 4.92 }
    ];

    // Sample data for BarChart
    const enrollmentsData = [
        { district: 'Peshawar', enrolled: 120 },
        { district: 'Swat', enrolled: 98 },
        { district: 'Mardan', enrolled: 85 },
        { district: 'Bannu', enrolled: 65 },
        { district: 'Other', enrolled: 40 }
    ];

    const genderData = [
        { name: "Boys", value: 54 },
        { name: "Girls", value: 46 },
    ];
    const COLORS = ["#4285F4", "#EC4899"];

    return (
        <>
            <div className="p-4 md:p-6 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 pb-4 " >
                    <StatsCards />
                </div>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6 sm:grid-cols-1">

                    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Enrollments by District (Voucher Program)</h3>

                        <div className="overflow-x-auto">
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={enrollmentsData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="district" tick={{ fontSize: 12, fill: '#6b7280' }} />
                                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="enrolled" fill="#4A90E2" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                    </div>

                    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">OOSC Trend Overview</h3>
                        <div className="h-48 md:h-64">
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#6b7280' }}
                                        domain={[4, 5]}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4A90E2"
                                        strokeWidth={2}
                                        dot={{ fill: '#4A90E2', strokeWidth: 2, r: 3 }}
                                        activeDot={{ r: 5, fill: '#2c5aa0' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>


                <div className="
  flex flex-col md:flex-row
  gap-4 md:gap-6
  bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 mt-4
">
  <div className="
    bg-[#F8FAFC] rounded-lg p-4 shadow border border-blue-100
    w-full md:w-1/2
    flex flex-col items-center
  ">
    <h3 className="text-center text-base font-semibold text-gray-900 mb-4">
      Gender Distribution
    </h3>
    <div className="w-full flex justify-center">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={genderData}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={60}
            paddingAngle={0}
            dataKey="value"
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            formatter={(value, entry) => {
              const item = genderData.find(d => d.name === value);
              return `${value} – ${item?.value}%`;
            }}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div
    className="flex flex-col items-center justify-center w-full md:w-1/2 space-y-2 pt-4"
  >
    <button
      className="text-black text-sm font-medium bg-transparent border border-gray-500 px-4 py-2 rounded-lg w-full transition-colors duration-200"
    >
      Edit info
    </button>
    <button
      className="text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg w-full transition-colors duration-200"
    >
      Export
    </button>
    <button
      className="text-white text-sm font-medium bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg w-full transition-colors duration-200"
    >
      Add Benificiary
    </button>
  </div>
</div>
            </div>
        </>
    );
}
