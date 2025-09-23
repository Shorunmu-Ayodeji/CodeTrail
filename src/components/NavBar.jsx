import React from 'react'

export default function NavBar() {
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-800">
      {/* Logo */}
      <h1 className="text-white text-2xl font-bold">w3stix</h1>

      {/* Button */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
        klick me
      </button>
    </nav>
    </div>
  )
}
