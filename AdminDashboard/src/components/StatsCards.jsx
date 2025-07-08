import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Children',
      value: '13,13 M',
      bgColor: 'bg-[#4A90E2]',
      textColor: 'text-white',
      dropdown: true
    },
    {
      title: 'Out Of School',
      value: '4,92 M',
      bgColor: 'bg-[#FFE4CC]',
      textColor: 'text-[#D97706]',
      dropdown: false
    },
    {
      title: 'Girls',
      value: '48%',
      bgColor: 'bg-[#E1F5FE]',
      textColor: 'text-[#1976D2]',
      dropdown: true
    },
    {
      title: 'Reduced Demand',
      value: '35',
      bgColor: 'bg-[#F5F5F5]',
      textColor: 'text-[#424242]',
      dropdown: false
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-lg p-4 md:p-6 shadow-sm`}
        >
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <h3 className={`text-xs md:text-sm font-medium ${stat.textColor} ${stat.bgColor === 'bg-[#4A90E2]' ? 'opacity-90' : 'opacity-80'}`}>
              {stat.title}
            </h3>
            {stat.dropdown && (
              <button className={`${stat.textColor} opacity-70 hover:opacity-100`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <div className={`text-2xl md:text-3xl font-bold ${stat.textColor}`}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
