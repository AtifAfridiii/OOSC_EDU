import React from 'react'

const Toast = ({ message, type = 'success', onClose }) => {
  // type: 'success' | 'error' | 'info' | 'warning'
  const typeStyles = {
    success: 'bg-green-100 border-green-400 text-green-800',
    error: 'bg-red-100 border-red-400 text-red-800',
    info: 'bg-blue-100 border-blue-400 text-blue-800',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  }

  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-4 rounded shadow-lg border-l-4 flex items-center space-x-3 transition-all duration-300 ${typeStyles[type]}`}
      role="alert"
    >
      <span className="flex-1 text-base font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-lg font-bold focus:outline-none text-gray-600 hover:text-gray-900"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
