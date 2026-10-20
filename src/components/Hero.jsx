import React from 'react'

export default function Hero() {
  return (
    <div>
      <section className="h-[80vh] flex flex-col items-center justify-center text-center bg-gray-900">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Welcome to My First React Project
      </h1>
      <p className="text-gray-300 text-lg mb-6">
        Learning React, Tailwind & GitHub step by step 🚀
      </p>
      <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition">
        Explore Now
      </button>
    </section>
    </div>
  )
}
