import React, { useState, useEffect } from 'react'
import { Search, Upload, Edit, Trash2, Plus, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { isUserAuthenticated, getAuthToken, clearAuthData } from '../../utils/authHelpers'
import Toast from '../../components/Toast'

const DataManagement = () => {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingEntryId, setEditingEntryId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [formData, setFormData] = useState({
    district: '',
    totalChildren: '',
    outOfSchoolChildren: '',
    girlsPercentage: '',
    boysPercentage: '',
    povertyPercentage: '',
    disabilityPercentage: '',
    otherPercentage: '',
    programType: '',
    date: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Transform form data to match backend schema with correct data types
  const transformFormDataForAPI = (data) => {
    return {
      district: data.district,
      totalChildren: parseInt(data.totalChildren) || 0,
      outOfSchoolChildren: parseInt(data.outOfSchoolChildren) || 0,
      girlsPercentage: parseFloat(data.girlsPercentage) || 0,
      boysPercentage: parseFloat(data.boysPercentage) || 0,
      povertyPercentage: parseFloat(data.povertyPercentage) || 0,
      disabilityPercentage: parseFloat(data.disabilityPercentage) || 0,
      otherPercentage: parseFloat(data.otherPercentage) || 0,
      programType: data.programType,
      date: data.date
    }
  }

  // API Functions
  const fetchAllEntries = async () => {
    setLoading(true)

    // Check authentication before making API call
    const token = localStorage.getItem('token')
    console.log('🔐 Auth check - Token exists:', !!token)
    if (!token) {
      console.error('❌ No authentication token found!')
      showToast('Authentication required. Please login.', 'error')
      setLoading(false)
      return
    }

    try {
      console.log('🔄 Fetching entries from:', API_PATHS.ENTRIES.GET_ALL_ENTRIES)
      const response = await axiosInstance.get(API_PATHS.ENTRIES.GET_ALL_ENTRIES)

      console.log('📥 Raw API Response:', response)
      console.log('📊 Response Data:', response.data)
      console.log('📊 Response Status:', response.status)

      // Check different possible data structures
      console.log('🔍 Checking data structure:')
      console.log('  - response.data:', response.data)
      console.log('  - response.data.entries:', response.data?.entries)
      console.log('  - response.data.data:', response.data?.data)
      console.log('  - Array.isArray(response.data):', Array.isArray(response.data))

      // Try different extraction methods
      let entriesData = []
      if (response.data?.entries && Array.isArray(response.data.entries)) {
        entriesData = response.data.entries
        console.log('✅ Found entries in response.data.entries')
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        entriesData = response.data.data
        console.log('✅ Found entries in response.data.data')
      } else if (Array.isArray(response.data)) {
        entriesData = response.data
        console.log('✅ Found entries directly in response.data')
      } else {
        console.log('❌ No valid entries array found in response')
        entriesData = []
      }

      console.log('📋 Extracted entries data:', entriesData)
      console.log('📋 Entries count:', entriesData.length)

      if (entriesData.length > 0) {
        console.log('📋 First entry sample:', entriesData[0])
        console.log('📋 Entry keys:', Object.keys(entriesData[0] || {}))
      }

      setEntries(entriesData)
      console.log('✅ Entries set in state:', entriesData.length, 'entries')
      showToast(`Entries loaded successfully (${entriesData.length} entries)`, 'success')
    } catch (error) {
      console.error('❌ Error fetching entries:', error)
      console.error('❌ Error details:', error.response?.data)
      setEntries([])
      showToast('Failed to load entries', 'error')
    } finally {
      setLoading(false)
    }
  }

  const createEntry = async (entryData) => {
    setLoading(true)
    try {
      console.log('📤 Creating entry with data:', entryData)
      const response = await axiosInstance.post(API_PATHS.ENTRIES.CREATE_ENTRY, entryData)
      console.log('✅ Created entry response:', response.data)
      await fetchAllEntries()
      showToast('Entry created successfully', 'success')
      return response.data
    } catch (error) {
      console.error('❌ Error creating entry:', error)
      console.error('❌ Error response:', error.response?.data)
      showToast('Failed to create entry', 'error')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateEntry = async (entryId, entryData) => {
    setLoading(true)
    try {
      console.log('📤 Updating entry', entryId, 'with data:', entryData)
      const response = await axiosInstance.put(API_PATHS.ENTRIES.UPDATE_ENTRY_BY_ID(entryId), entryData)
      console.log('✅ Updated entry response:', response.data)
      await fetchAllEntries()
      showToast('Entry updated successfully', 'success')
      return response.data
    } catch (error) {
      console.error('❌ Error updating entry:', error)
      console.error('❌ Error response:', error.response?.data)
      showToast('Failed to update entry', 'error')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteEntry = async (entryId) => {
    setLoading(true)
    try {
      await axiosInstance.delete(API_PATHS.ENTRIES.DELETE_ENTRY_BY_ID(entryId))
      console.log('Deleted entry:', entryId)
      await fetchAllEntries()
      showToast('Entry deleted successfully', 'success')
    } catch (error) {
      console.error('Error deleting entry:', error)
      showToast('Failed to delete entry', 'error')
    } finally {
      setLoading(false)
    }
  }

  const getEntryById = async (entryId) => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.ENTRIES.GET_ENTRY_BY_ID(entryId))
      console.log('Fetched entry by ID:', response.data)
      return response.data
    } catch (error) {
      console.error('Error fetching entry by ID:', error)
      showToast('Failed to fetch entry details', 'error')
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Utility Functions
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000)
  }

  // Check authentication and load entries on component mount
  useEffect(() => {
    const initializeComponent = async () => {
      console.log('🚀 Initializing DataManagement component...')

      // Check authentication first
      const isAuth = checkAuthentication()

      if (isAuth) {
        console.log('✅ User is authenticated, loading data...')
        try {
          await fetchAllEntries()
        } catch (error) {
          console.error('Failed to load initial data:', error)
          setEntries([])
        }
      } else {
        console.log('❌ User is not authenticated')
        showToast('Please login to access data management', 'error')
      }
    }

    initializeComponent()
  }, [])

  // Debug entries state changes
  useEffect(() => {
    console.log('📊 Entries state changed:', {
      entriesCount: (entries || []).length,
      entries: entries,
      firstEntry: entries?.[0]
    })
  }, [entries])

  const handleAddEntry = async () => {
    if (
      !formData.district ||
      !formData.totalChildren ||
      !formData.outOfSchoolChildren ||
      !formData.date ||
      !formData.povertyPercentage ||
      !formData.disabilityPercentage ||
      !formData.otherPercentage
    ) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    try {
      // Transform form data to match backend schema
      const transformedData = transformFormDataForAPI(formData)
      console.log('📤 Sending transformed data:', transformedData)

      if (isEditMode && editingEntryId) {
        await updateEntry(editingEntryId, transformedData)
        setIsEditMode(false)
        setEditingEntryId(null)
      } else {
        await createEntry(transformedData)
      }

      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)

      handleReset()
      setShowForm(false)
    } catch (error) {
      console.error('Error in handleAddEntry:', error)
    }
  }

  const handleEditEntry = async (entryId) => {
    try {
      const entryData = await getEntryById(entryId)
      const entry = entryData.entry || entryData

      setFormData({
        district: entry.district || '',
        totalChildren: entry.totalChildren || '',
        outOfSchoolChildren: entry.outOfSchoolChildren || '',
        girlsPercentage: entry.girlsPercentage || '',
        boysPercentage: entry.boysPercentage || '',
        povertyPercentage: entry.povertyPercentage || '',
        disabilityPercentage: entry.disabilityPercentage || '',
        otherPercentage: entry.otherPercentage || '',
        programType: entry.programType || '',
        date: entry.date || ''
      })

      setIsEditMode(true)
      setEditingEntryId(entryId)
      setShowForm(true)
    } catch (error) {
      console.error('Error in handleEditEntry:', error)
    }
  }

  const handleDeleteEntry = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry(entryId)
      } catch (error) {
        console.error('Error in handleDeleteEntry:', error)
      }
    }
  }

  const handleReset = () => {
    setFormData({
      district: '',
      totalChildren: '',
      outOfSchoolChildren: '',
      girlsPercentage: '',
      boysPercentage: '',
      povertyPercentage: '',
      disabilityPercentage: '',
      otherPercentage: '',
      programType: '',
      date: ''
    })
    setShowSuccessMessage(false)
    setIsEditMode(false)
    setEditingEntryId(null)
  }

  const handleCancelEdit = () => {
    handleReset()
    setShowForm(false)
  }

  const handleShowForm = () => {
    setShowForm(true)
    setIsEditMode(false)
    setEditingEntryId(null)
  }

  const handleUploadCSV = () => {
    console.log('Uploading CSV')
  }

  // Authentication helpers
  const checkAuthentication = () => {
    const authStatus = isUserAuthenticated()
    const token = getAuthToken()
    console.log('🔐 Authentication Status:', { authStatus, hasToken: !!token })
    setIsAuthenticated(authStatus && !!token)
    return authStatus && !!token
  }

  const handleLogin = () => {
    navigate('/login')
  }



  // Debug entries state and filtering
  console.log('🔍 Debug Info:')
  console.log('  - entries state:', entries)
  console.log('  - entries length:', (entries || []).length)
  console.log('  - searchTerm:', searchTerm)

  const filteredEntries = (entries || []).filter(entry => {
    if (!entry) {
      console.log('⚠️ Found null/undefined entry')
      return false
    }

    // If no search term, return all entries
    if (!searchTerm || searchTerm.trim() === '') {
      return true
    }

    const searchLower = searchTerm.toLowerCase()
    const matchesDistrict = entry?.district?.toLowerCase().includes(searchLower)
    const matchesProgram = entry?.programType?.toLowerCase().includes(searchLower)
    const matchesDate = entry?.date?.toLowerCase().includes(searchLower)

    const matches = matchesDistrict || matchesProgram || matchesDate

    if (matches) {
      console.log('✅ Entry matches search:', entry.district, entry.programType, entry.date)
    }

    return matches
  })

  console.log('📊 Filtered entries:', filteredEntries)
  console.log('📊 Filtered entries length:', filteredEntries.length)

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-6 px-2 md:px-6">
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(t => ({ ...t, visible: false }))} />
      )}

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
              <p className="text-gray-600 mt-1">Manage your entries and data records</p>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  isAuthenticated
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {isAuthenticated ? '🔓 Authenticated' : '🔒 Not Authenticated'}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                />
              </div>



              {!isAuthenticated ? (
                <button
                  onClick={handleLogin}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200"
                >
                  🔑 Login
                </button>
              ) : (
                <>
                  <button
                    onClick={handleShowForm}
                    className="bg-[#4A90E2] hover:bg-[#2c5aa0] text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5" />
                    Add Entry
                  </button>


                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="max-w-3xl mx-auto mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {isEditMode ? 'Edit Entry' : 'Add New Entry'}
              </h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

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
                    type="number"
                    value={formData.totalChildren}
                    onChange={(e) => handleInputChange('totalChildren', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                    placeholder="12000"
                    min="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Out-of-School Children</label>
                  <input
                    type="number"
                    value={formData.outOfSchoolChildren}
                    onChange={(e) => handleInputChange('outOfSchoolChildren', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                    placeholder="4500"
                    min="0"
                  />
                </div>
              </div>

              {/* Row: Gender Distribution */}
              <div className="flex flex-col md:flex-row md:space-x-6 mb-4">
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Girls %</label>
                  <input
                    type="number"
                    value={formData.girlsPercentage}
                    onChange={(e) => handleInputChange('girlsPercentage', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                    placeholder="60"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Boys %</label>
                  <input
                    type="number"
                    value={formData.boysPercentage}
                    onChange={(e) => handleInputChange('boysPercentage', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                    placeholder="40"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Row: Program Type & Date */}
              <div className="flex flex-col md:flex-row md:space-x-6 mb-4">
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Type</label>
                  <input
                    type="text"
                    value={formData.programType}
                    onChange={(e) => handleInputChange('programType', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                    placeholder="e.g. Accelerated Learning Program"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg shadow-sm"
                  />
                </div>
              </div>

              {/* Row: Barriers */}
              <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poverty %</label>
                  <input
                    type="number"
                    value={formData.povertyPercentage}
                    onChange={(e) => handleInputChange('povertyPercentage', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                    placeholder="45"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex-1 mb-4 md:mb-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Disability %</label>
                  <input
                    type="number"
                    value={formData.disabilityPercentage}
                    onChange={(e) => handleInputChange('disabilityPercentage', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                    placeholder="15"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other %</label>
                  <input
                    type="number"
                    value={formData.otherPercentage}
                    onChange={(e) => handleInputChange('otherPercentage', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-blue-100 bg-[#F8F9FA] focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg placeholder-gray-400 shadow-sm"
                    placeholder="25"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              {/* Success Message */}
              {showSuccessMessage && (
                <div className="mb-4">
                  <span className="text-green-600 text-base">
                    {isEditMode ? 'Entry updated successfully!' : 'Entry added successfully!'}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row md:space-x-4 mt-6">
                <button
                  onClick={handleAddEntry}
                  type="button"
                  disabled={loading}
                  className="w-full md:w-auto mb-2 md:mb-0 bg-[#4A90E2] hover:bg-[#2c5aa0] disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-2 rounded-lg font-medium text-lg shadow-sm transition-colors duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      {isEditMode ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    isEditMode ? 'Update Entry' : 'Add Entry'
                  )}
                </button>

                <button
                  onClick={handleReset}
                  type="button"
                  disabled={loading}
                  className="w-full md:w-auto mb-2 md:mb-0 bg-white border border-blue-200 hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-[#2c5aa0] px-8 py-2 rounded-lg font-medium text-lg shadow-sm transition-colors duration-200"
                >
                  Reset
                </button>

                <button
                  onClick={handleUploadCSV}
                  type="button"
                  disabled={loading}
                  className="w-full md:w-auto bg-white border border-blue-200 hover:bg-blue-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-[#2c5aa0] px-8 py-2 rounded-lg font-medium text-lg shadow-sm transition-colors duration-200 flex items-center justify-center"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload CSV
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Data Entries Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Data Entries ({filteredEntries.length} of {(entries || []).length})
            </h3>
            {loading && (
              <div className="flex items-center text-gray-500">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500 mr-2"></div>
                Loading...
              </div>
            )}
          </div>

          {/* Debug table rendering */}
          {console.log('🎨 Rendering table with:', {
            filteredEntriesLength: filteredEntries.length,
            entriesLength: (entries || []).length,
            showingEmptyState: filteredEntries.length === 0
          })}

          {!isAuthenticated ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-lg mb-2">🔒 Authentication Required</div>
              <p className="text-gray-500 mb-4">
                You need to be logged in to view and manage data entries.
              </p>
              <button
                onClick={handleLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Go to Login
              </button>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No entries found</div>
              <p className="text-gray-500">
                {(entries || []).length === 0
                  ? "Start by adding your first entry"
                  : "Try adjusting your search criteria"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Children</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Out of School</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Girls %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boys %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poverty %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disability %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other %</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id || entry._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.district}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.totalChildren}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.outOfSchoolChildren}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.girlsPercentage}%</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.boysPercentage}%</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.povertyPercentage}%</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.disabilityPercentage}%</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.otherPercentage}%</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.programType}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEditEntry(entry.id || entry._id)}
                            disabled={loading}
                            className="text-blue-600 hover:text-blue-900 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEntry(entry.id || entry._id)}
                            disabled={loading}
                            className="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DataManagement
