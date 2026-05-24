import React from 'react'

function SkinTypeCard({ skinType, info }) {
  if (!info) return null

  const skinTypeEmoji = {
    dry: '🏜️',
    oily: '💧',
    combination: '⚖️',
    sensitive: '🌸',
    normal: '🌟',
  }

  return (
    <div className="card bg-gradient-to-br from-white to-glow-50">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{skinTypeEmoji[skinType] || '🧬'}</span>
        <h2 className="font-display text-2xl font-bold text-gray-900">
          Your Skin Type: {info.name}
        </h2>
      </div>
      <p className="text-gray-600 mb-6">{info.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tips */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">💡 Pro Tips:</h3>
          <ul className="space-y-2">
            {info.tips?.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-glow-400 mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Ingredients */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">✅ Key Ingredients:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {info.key_ingredients?.map((ingredient, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>

          <h3 className="font-semibold text-gray-800 mb-2">❌ Avoid:</h3>
          <div className="flex flex-wrap gap-2">
            {info.avoid_ingredients?.map((ingredient, idx) => (
              <span
                key={idx}
                className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkinTypeCard
