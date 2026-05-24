import React from 'react'
import { motion } from 'framer-motion'

function QuestionCard({ question, selectedOption, onSelect }) {
  if (!question) return null

  const categoryLabels = {
    skin_type: '🧬 Skin Type',
    concerns: '🎯 Concerns',
    lifestyle: '🌿 Lifestyle',
    routine: '🧴 Current Routine',
    preferences: '💰 Preferences',
  }

  return (
    <div className="card">
      <div className="mb-2">
        <span className="text-sm font-medium text-glow-600 bg-glow-50 px-3 py-1 rounded-full">
          {categoryLabels[question.category] || question.category}
        </span>
      </div>
      <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 mt-4">
        {question.question}
      </h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedOption === option.id
                ? 'quiz-option-selected'
                : 'border-gray-100 hover:border-glow-200 hover:bg-glow-50/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedOption === option.id
                    ? 'border-glow-500 bg-glow-500'
                    : 'border-gray-300'
                }`}
              >
                {selectedOption === option.id && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`font-medium ${
                selectedOption === option.id ? 'text-glow-700' : 'text-gray-700'
              }`}>
                {option.text}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard
