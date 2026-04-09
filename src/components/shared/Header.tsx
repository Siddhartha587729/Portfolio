'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container-max py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-slate-900 hidden sm:inline">Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-blue-600 transition-colors">
              Portfolio
            </Link>
            <Link href="/resume" className="text-slate-600 hover:text-blue-600 transition-colors">
              Resume
            </Link>
            <Link href="/studio" className="text-slate-600 hover:text-blue-600 transition-colors">
              Studio
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden mt-4 space-y-4 pb-4">
            <Link
              href="/"
              className="block text-slate-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/resume"
              className="block text-slate-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Resume
            </Link>
            <Link
              href="/studio"
              className="block text-slate-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Studio
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
