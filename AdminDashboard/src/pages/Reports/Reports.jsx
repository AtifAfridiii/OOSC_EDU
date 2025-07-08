import React, { useState } from 'react'
import { Search, Download, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'

const Reports = () => {
  const [filters, setFilters] = useState({
    district: 'Select...',
    program: 'Select...',
    year: '2024'
  })

  // Sample data for the enrollment comparison chart
  const enrollmentData = [
    { district: 'Swabi', voucher: 250, merged: 200 },
    { district: 'Mardan', voucher: 300, merged: 250 },
    { district: 'Bannu', voucher: 280, merged: 180 },
    { district: 'Kohat', voucher: 320, merged: 220 },
    { district: 'Charsadda', voucher: 240, merged: 160 }
  ]

  // Program summary data
  const programSummary = [
    { district: 'Swabi', program: 'Voucher', enrolled: 1500, dropout: 22, girls: 45 },
    { district: 'Mardan', program: 'Merged', enrolled: 980, dropout: 15, girls: 51 },
    { district: 'Bannu', program: 'Voucher', enrolled: 720, dropout: 24, girls: 40 }
  ]

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const handleExportExcel = () => {
    console.log('Exporting to Excel...')
  }

  const handleExportPDF = () => {
    console.log('Exporting to PDF...')
  }

  return (
    <div className="p-4 md:p-6 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Reports</h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
          {/* Header with Logo and Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200">
                <span className="text-[#2c5aa0] font-bold text-sm">O</span>
              </div>
              <span className="font-medium text-sm text-gray-700">OOSC Edu App Track</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Reports</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Here..."
                  className="text-sm bg-transparent border-none outline-none w-32 md:w-40 placeholder-gray-400"
                />
                <span className="text-sm text-gray-500 font-medium">2025</span>
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">U</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District:
              </label>
              <select
                value={filters.district}
                onChange={(e) => handleFilterChange('district', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="Select...">Select...</option>
                <option value="Swabi">Swabi</option>
                <option value="Mardan">Mardan</option>
                <option value="Bannu">Bannu</option>
                <option value="Kohat">Kohat</option>
                <option value="Charsadda">Charsadda</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program:
              </label>
              <select
                value={filters.program}
                onChange={(e) => handleFilterChange('program', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="Select...">Select...</option>
                <option value="Voucher">Voucher Program</option>
                <option value="Merged">Merged Program</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year:
              </label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 md:p-6 text-center hover:shadow-md transition-shadow duration-200">
              <div className="text-sm font-medium text-blue-600 mb-2">Enrolled</div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700">8,320</div>
            </div>
            
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 md:p-6 text-center hover:shadow-md transition-shadow duration-200">
              <div className="text-sm font-medium text-red-600 mb-2">Dropout Rate</div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-red-700">38%</div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 md:p-6 text-center hover:shadow-md transition-shadow duration-200">
              <div className="text-sm font-medium text-yellow-600 mb-2">Girls Enrolled</div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-700">46%</div>
            </div>
          </div>

          {/* Enrollment Comparison Chart */}
          <div className="mb-8 bg-gray-50 rounded-lg p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 lg:mb-0">
                Enrollment Comparison by District
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#4A90E2] rounded-sm"></div>
                  <span className="text-gray-600 font-medium">Voucher Program</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-[#2ECC71] rounded-sm"></div>
                  <span className="text-gray-600 font-medium">Merged Program</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="h-64 md:h-80 lg:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={enrollmentData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="district" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <Bar dataKey="voucher" fill="#4A90E2" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="merged" fill="#2ECC71" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Program Summary Table */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Program Summary Table</h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        District
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Program
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrolled
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dropout
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Girls %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {programSummary.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {row.district}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.program}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {row.enrolled.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {row.dropout}%
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {row.girls}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={handleExportExcel}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            
            <button
              onClick={handleExportPDF}
              className="bg-[#4A90E2] hover:bg-[#2c5aa0] text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
            >
              <FileText className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
