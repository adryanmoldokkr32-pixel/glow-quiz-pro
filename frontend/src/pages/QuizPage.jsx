import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'

function QuizPage({ onComplete }) {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/api/questions')
      setQuestions(response.data.questions)
      setLoading(false)
    } catch (err) {
      setError('Failed to load questions. Please try again.')
      setLoading(false)
    }
  }

  const handleAnswer = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, optionId]) => ({
        question_id: parseInt(questionId),
        option_id: optionId,
      }))

      const response = await axios.post('/api/quiz/submit', { answers: formattedAnswers })
      onComplete(response.data)
      navigate('/results')
    } catch (err) {
      setError('Failed to submit quiz. Please try again.')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 to-glow-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-glow-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your quiz...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 to-glow-50">
        <div className="card text-center max-w-md">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchQuestions} className="btn-primary">Try Again</button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const isAnswered = answers[currentQuestion?.id] !== undefined
  const allAnswered = questions.every(q => answers[q.id] !== undefined)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-glow-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-glow-700 mb-2">✨ Glow Quiz Pro</h1>
          <p className="text-gray-500">Question {currentIndex + 1} of {questions.length}</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionCard
              question={currentQuestion}
              selectedOption={answers[currentQuestion?.id]}
              onSelect={(optionId) => handleAnswer(currentQuestion.id, optionId)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              currentIndex === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-glow-600 hover:bg-glow-50'
            }`}
          >
            ← Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || submitting}
              className={`btn-primary ${(!allAnswered || submitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {submitting ? 'Analyzing...' : 'Get My Results ✨'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`btn-primary ${!isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizPage
