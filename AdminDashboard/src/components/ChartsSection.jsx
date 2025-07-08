import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const ChartsSection = () => {
  // Sample data for OOSC Trend Overview
  const trendData = [
    { year: '2019', value: 4.2 },
    { year: '2020', value: 4.5 },
    { year: '2021', value: 4.8 },
    { year: '2022', value: 4.6 },
    { year: '2023', value: 4.9 },
    { year: '2024', value: 4.92 }
  ]

  // Sample data for OOSC By Districts (Donut Chart)
  const districtData = [
    { name: 'In School', value: 52, color: '#93C5FD' },
    { name: 'Out of School', value: 48, color: '#4A90E2' }
  ]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
      {/* OOSC Trend Overview */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">OOSC Trend Overview</h3>
        <div className="h-48 md:h-64">
          <ResponsiveContainer width="100%" height="100%">
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

      {/* OOSC By Districts */}
      <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">OOSC By Districts</h3>
        <div className="h-48 md:h-64 flex items-center justify-center">


          {/* Donut Chart  ===> The responsivness is in px should change it to */}

          <div className="relative w-[220px] h-[200px] md:w-[280px] md:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={districtData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {districtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-gray-900">48%</div>
                <div className="text-xs md:text-sm text-gray-600">Out of School</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartsSection
