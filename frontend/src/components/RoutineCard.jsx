import React from 'react'

function RoutineCard({ title, steps, icon }) {
  if (!steps) return null

  return (
    <div className="card">
      <h3 className="font-display text-xl font-bold text-gray-900 mb-4">
        {icon} {title}
      </h3>
      <ol className="space-y-3">
        {steps.map((step, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-glow-100 text-glow-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
              {idx + 1}
            </span>
            <span className="text-gray-700">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default RoutineCard
