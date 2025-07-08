import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const BottomSection = () => {
  // OOSC by District data
  const districtData = [
    { name: 'Peshawar', value: 85 },
    { name: 'Swat', value: 70 },
    { name: 'Mardan', value: 60 },
    { name: 'Bannu', value: 45 },
    { name: 'Other', value: 30 }
  ]

  // Access Programmes data
  const programData = [
    { name: 'Formal', value: 80 },
    { name: 'Vouchers', value: 50 },
    { name: 'Merged Schools', value: 35 }
  ]

  // Drop-out Reasons data
  const dropoutReasons = [
    { reason: 'Distance', percentage: 55, color: 'bg-[#FFC107]' },
    { reason: 'Poverty', percentage: 65, color: 'bg-[#F44336]' },
    { reason: 'Other', percentage: 30, color: 'bg-[#9C27B0]' }
  ]

  // Activity data
  const activities = [
    { text: 'Weekly survey uploaded in Bajaur Tehsil', time: '2 hours ago', user: 'Admin' },
    { text: 'District Survey updated (OOSC by 4%)', time: '4 hours ago', user: 'User' },
    { text: 'Uploaded girls enrollment data', time: '6 hours ago', user: 'Admin' },
    { text: 'Created report on 2024', time: '8 hours ago', user: 'User' }
  ]

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
      {/* Left Column - Bar Charts */}
      <div className="space-y-4 md:space-y-6">
        {/* OOSC by District */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">OOSC by District</h3>
          <div className="space-y-3">
            {districtData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 md:w-20 text-xs md:text-sm text-gray-600 truncate">{item.name}</div>
                <div className="flex-1 mx-2 md:mx-3">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#4A90E2] h-2 rounded-full"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs md:text-sm text-gray-600 w-8">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Access Programmes */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Access Programmes</h3>
          <div className="space-y-3">
            {programData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-20 text-sm text-gray-600">{item.name}</div>
                <div className="flex-1 mx-3">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#4A90E2] h-2 rounded-full"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 w-8">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Drop-out Reasons and Activity */}
      <div className="space-y-4 md:space-y-6">
        {/* Drop-out Reasons */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Drop-out Reasons</h3>
          <div className="space-y-3">
            {dropoutReasons.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-sm text-gray-600">{item.reason}</div>
                <div className="flex-1 mx-3">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 w-8">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Activity</h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-[#4A90E2] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs md:text-sm text-gray-900 leading-relaxed">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomSection
