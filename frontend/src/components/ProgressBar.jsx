import React from 'react'

function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100

  return (
    <div className="mb-8">
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-glow-400 to-glow-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
