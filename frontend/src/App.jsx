import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import ResultsPage from './pages/ResultsPage'

function App() {
  const [quizResults, setQuizResults] = useState(null)

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage onComplete={setQuizResults} />} />
          <Route path="/results" element={<ResultsPage results={quizResults} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
