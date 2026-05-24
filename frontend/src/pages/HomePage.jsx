import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-glow-50">
      {/* Header */}
      <header className="py-6 px-8">
        <nav className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="font-display text-2xl font-bold text-glow-700">
            ✨ Glow Quiz Pro
          </h1>
          <Link to="/quiz" className="text-glow-600 font-medium hover:text-glow-700 transition-colors">
            Take the Quiz →
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-glow-500 to-glow-700">
              {' '}Perfect{' '}
            </span>
            Skincare Routine
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Take our personalized quiz to uncover your skin type, get expert recommendations,
            and build a routine that makes your skin glow from within.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz" className="btn-primary text-lg">
              Start Your Glow Journey
            </Link>
            <a href="#how-it-works" className="btn-secondary text-lg">
              How It Works
            </a>
          </div>
        </motion.div>

        {/* Features */}
        <motion.section
          id="how-it-works"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-32 grid md:grid-cols-3 gap-8"
        >
          <div className="card text-center">
            <div className="text-4xl mb-4">🧪</div>
            <h3 className="font-display text-xl font-semibold mb-2">Analyze Your Skin</h3>
            <p className="text-gray-600">
              Answer 10 carefully crafted questions about your skin type, concerns, and lifestyle.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="font-display text-xl font-semibold mb-2">Get Matched</h3>
            <p className="text-gray-600">
              Our algorithm matches you with the perfect products and ingredients for your unique skin.
            </p>
          </div>
          <div className="card text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-display text-xl font-semibold mb-2">Glow Up</h3>
            <p className="text-gray-600">
              Follow your personalized AM & PM routine and watch your skin transform in weeks.
            </p>
          </div>
        </motion.section>

        {/* Testimonial */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="card max-w-2xl mx-auto bg-gradient-to-br from-glow-50 to-cream-100">
            <p className="text-lg italic text-gray-700 mb-4">
              "I've spent years buying random products. This quiz finally helped me understand
              what my skin actually needs. My acne cleared up in just 6 weeks!"
            </p>
            <p className="font-semibold text-glow-700">— Sarah K., Verified User</p>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-8 mt-16 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 Glow Quiz Pro. Built with 💕 for better skin days.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
