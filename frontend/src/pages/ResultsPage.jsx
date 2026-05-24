import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SkinTypeCard from '../components/SkinTypeCard'
import RoutineCard from '../components/RoutineCard'
import ProductCard from '../components/ProductCard'

function ResultsPage({ results }) {
  if (!results) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-glow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Glow Profile ✨
          </h1>
          <p className="text-lg text-gray-600">
            Here's your personalized skincare breakdown
          </p>
        </motion.div>

        {/* Skin Type */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <SkinTypeCard
            skinType={results.skin_type}
            info={results.skin_type_info}
          />
        </motion.section>

        {/* Primary Concern */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <div className="card">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">
              🎯 Primary Concern: {results.concern_info?.name}
            </h2>
            <p className="text-gray-600 mb-4">{results.concern_info?.description}</p>
            {results.concern_info?.recommended_products && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Recommended Approach:</h3>
                <ul className="space-y-2">
                  {results.concern_info.recommended_products.map((product, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-glow-500 mt-1">•</span>
                      <span className="text-gray-700">
                        <strong>{product.name}</strong> — {product.usage}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.section>

        {/* Routine */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            🌅 Your Recommended Routine
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <RoutineCard title="Morning (AM)" steps={results.recommended_routine?.am} icon="☀️" />
            <RoutineCard title="Evening (PM)" steps={results.recommended_routine?.pm} icon="🌙" />
          </div>
        </motion.section>

        {/* Product Recommendations */}
        {results.recommended_products?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
              💄 Product Picks For You
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.recommended_products.map((product, idx) => (
                <ProductCard key={idx} product={product} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Lifestyle Tips */}
        {results.lifestyle_tips?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <div className="card bg-gradient-to-br from-glow-50 to-cream-100">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                💡 Lifestyle Tips
              </h2>
              <ul className="space-y-3">
                {results.lifestyle_tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-glow-500 font-bold text-lg">✓</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/quiz" className="btn-secondary mr-4">
            Retake Quiz
          </Link>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default ResultsPage
