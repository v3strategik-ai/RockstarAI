"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/knowledge-base', label: 'Knowledge Base' },
    { href: '/integrations', label: 'Integrations' },
    { href: '/chat', label: 'AI Assistant' }
  ]

  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-apex-border/20 shadow-professional">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Professional Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10">
              <div className="w-full h-full bg-gradient-to-br from-apex-blue to-apex-blue-light rounded-lg flex items-center justify-center group-hover:shadow-apex-glow transition-all duration-300">
                <div className="text-lg font-bold text-white">A</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-apex-blue apex-text group-hover:animate-glow-subtle">
                APEX
              </span>
              <span className="text-lg font-semibold text-apex-accent">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                  pathname === item.href
                    ? 'text-white bg-apex-blue/20 apex-border border-apex-blue shadow-apex-glow'
                    : 'text-gray-300 hover:text-apex-blue hover:bg-apex-blue/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 status-online rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400 font-medium">Online</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-apex-blue/10 text-apex-blue hover:bg-apex-blue/20 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-apex-border/20">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? 'text-white bg-apex-blue/20 apex-border border-apex-blue'
                      : 'text-gray-300 hover:text-apex-blue hover:bg-apex-blue/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}