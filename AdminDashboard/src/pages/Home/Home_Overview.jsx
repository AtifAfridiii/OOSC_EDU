import React,{useState,useEffect} from 'react'
import StatsCards from '../../components/StatsCards'
import ChartsSection from '../../components/ChartsSection'
import BottomSection from '../../components/BottomSection'
import ActionButtons from '../../components/ActionButtons'


const MainContent = () => {

  return (
    <main className="p-4 md:p-6 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Top Filter Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 mt-2">
          <button className="flex-1 bg-[#4A90E2]  text-white font-semibold px-6 py-2 rounded-lg flex items-center justify-between transition-colors duration-200">
            Total Children

          </button>
          <button className="flex-1 bg-[#4A90E2] hover:bg-[#2c5aa0] text-white font-semibold px-6 py-2 rounded-lg flex items-center justify-between transition-colors duration-200">
            Gender
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
        {/* Statistics Cards */}
        <StatsCards />

        {/* Charts Section */}
        <ChartsSection />

        {/* Bottom Section with Bar Charts and Activity */}
        <BottomSection />

        {/* Action Buttons */}
        <ActionButtons />
      </div>
    </main>
  )
}

export default MainContent
