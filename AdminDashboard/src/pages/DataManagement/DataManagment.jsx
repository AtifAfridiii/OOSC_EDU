import React, { useState } from 'react'
import { Search, Upload } from 'lucide-react'
import EditDataModal from '../../components/EditDataModal'

const DataManagement = () => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [entries, setEntries] = useState([])
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({
    managementSystem: 'District',
    district: '',
    totalChildren: '',
    outOfSchoolChildren: '',
    gender: { girls: '', boys: '' },
    programType: 'Voucher',
    date: '',
    dropOutReasons: {
      poverty: false,
      distance: false,
      other: false
    }
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenderChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      gender: {
        ...prev.gender,
        [type]: value
      }
    }))
  }

  const handleDropOutChange = (reason, checked) => {
    setFormData(prev => ({
      ...prev,
      dropOutReasons: {
        ...prev.dropOutReasons,
        [reason]: checked
      }
    }))
  }

  const handleAddEntry = () => {
    // Validate required fields
    if (!formData.district || !formData.totalChildren || !formData.outOfSchoolChildren || !formData.date) {
      alert('Please fill in all required fields')
      return
    }

    // Create new entry with unique ID
    const newEntry = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toLocaleString()
    }

    // Add to entries list
    setEntries(prev => [...prev, newEntry])

    // Show success message
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)

    // Reset form
    handleReset()
  }

  const handleReset = () => {
    setFormData({
      managementSystem: 'District',
      district: '',
      totalChildren: '',
      outOfSchoolChildren: '',
      gender: { girls: '', boys: '' },
      programType: 'Voucher',
      date: '',
      dropOutReasons: {
        poverty: false,
        distance: false,
        other: false
      }
    })
    setShowSuccessMessage(false)
  }

  const handleUploadCSV = () => {
    // CSV upload logic here
    console.log('Uploading CSV')
  }

  const handleEditEntry = (updatedEntry) => {
    setEntries(prev => prev.map(entry =>
      entry.id === updatedEntry.id ? updatedEntry : entry
    ))
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center py-6 px-2 md:px-0">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-8">
        <h2 className="text-lg font-semibold mb-6 text-gray-900 text-center">Management System</h2>
        <form className="w-full">
          {/* District */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <input
              type="text"
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
              placeholder="Mardan"
            />
          </div>
          {/* Row: Total Children & Out-of-School Children */}
          <div className="flex flex-col md:flex-row md:space-x-6 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Children</label>
              <input
                type="text"
                value={formData.totalChildren}
                onChange={(e) => handleInputChange('totalChildren', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                placeholder="12,000"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Out-of-School Children</label>
              <input
                type="text"
                value={formData.outOfSchoolChildren}
                onChange={(e) => handleInputChange('outOfSchoolChildren', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                placeholder="4,500"
              />
            </div>
          </div>
          {/* Row: Gender & Drop Out Reasons */}
          <div className="flex flex-col md:flex-row md:space-x-6 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={formData.gender.girls}
                  onChange={(e) => handleGenderChange('girls', e.target.value)}
                  className="w-1/2 px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm mr-2"
                  placeholder="Girls %"
                />
                <input
                  type="text"
                  value={formData.gender.boys}
                  onChange={(e) => handleGenderChange('boys', e.target.value)}
                  className="w-1/2 px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                  placeholder="Boys %"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Drop Out Reasons</label>
              <div className="flex flex-row space-x-4 mt-2">
                <label className="flex items-center text-base">
                  <input
                    type="checkbox"
                    checked={formData.dropOutReasons.poverty}
                    onChange={(e) => handleDropOutChange('poverty', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2">Poverty</span>
                </label>
                <label className="flex items-center text-base">
                  <input
                    type="checkbox"
                    checked={formData.dropOutReasons.distance}
                    onChange={(e) => handleDropOutChange('distance', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2">Distance</span>
                </label>
                <label className="flex items-center text-base">
                  <input
                    type="checkbox"
                    checked={formData.dropOutReasons.other}
                    onChange={(e) => handleDropOutChange('other', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
            </div>
          </div>
          {/* Program Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Program Type</label>
            <input
              type="text"
              value={formData.programType}
              onChange={(e) => handleInputChange('programType', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
              placeholder="Voucher"
            />
          </div>
          {/* Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="text"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
              placeholder="04/08/2024"
            />
          </div>
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-4">
              <span className="text-green-600 text-base">Data added Sucessfully!</span>
            </div>
          )}
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row md:space-x-4 mt-6">
            <button
              onClick={handleAddEntry}
              type="button"
              className="w-full md:w-auto mb-2 md:mb-0 bg-[#4A90E2] hover:bg-[#2c5aa0] text-white px-8 py-2 rounded-lg font-medium text-lg shadow-sm transition-colors duration-200"
            >
              Add Entery
            </button>
            <button
              onClick={handleReset}
              type="button"
              className="w-full md:w-auto mb-2 md:mb-0 bg-white border border-blue-200 hover:bg-blue-50 text-[#2c5aa0] px-8 py-2 rounded-lg font-medium text-lg shadow-sm transition-colors duration-200"
            >
              Reset
            </button>
            <button
              onClick={handleUploadCSV}
              type="button"
              className="w-full md:w-auto bg-white border border-blue-200 hover:bg-blue-50 text-[#2c5aa0] px-8 py-2 rounded-lg font-medium text-lg shadow-sm transition-colors duration-200 flex items-center justify-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload CSV
            </button>
          </div>
        </form>
      </div>
      {/* Edit Modal (still available for table below) */}
      {showEditModal && (
        <EditDataModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setSelectedEntry(null)
          }}
          data={selectedEntry}
          onSave={handleEditEntry}
        />
      )}
      {/* Data Entries Table (unchanged, below form) */}
      {entries.length > 0 && (
        <div className="mt-8 w-full max-w-5xl bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Entries ({entries.length})</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Children</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out of School</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Girls %</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boys %</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.district}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.totalChildren}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.outOfSchoolChildren}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.gender.girls}%</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.gender.boys}%</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.programType}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedEntry(entry)
                          setShowEditModal(true)
                        }}
                        className="text-[#4A90E2] hover:text-[#2c5aa0] mr-3"
                      >Edit</button>
                      <button
                        onClick={() => {
                          setEntries(prev => prev.filter(e => e.id !== entry.id))
                        }}
                        className="text-red-600 hover:text-red-900"
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataManagement
