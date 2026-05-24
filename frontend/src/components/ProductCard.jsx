import React from 'react'

function ProductCard({ product }) {
  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-medium text-glow-600 bg-glow-50 px-2 py-1 rounded-full capitalize">
          {product.category}
        </span>
        <span className="text-sm font-bold text-gray-900">
          ${product.price?.toFixed(2)}
        </span>
      </div>
      <h4 className="font-semibold text-gray-900 mt-3 mb-2 leading-tight">
        {product.name}
      </h4>
      <div className="flex flex-wrap gap-1 mt-2">
        {product.key_ingredients?.map((ingredient, idx) => (
          <span
            key={idx}
            className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded"
          >
            {ingredient}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProductCard
