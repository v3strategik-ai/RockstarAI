"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Hero Title */}
          <div className="mb-8">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-neon-blue neon-text animate-glow">APEX</span>
              <span className="text-neon-green neon-text ml-4">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Advanced Personal Executive Assistant That 
              <span className="text-neon-green font-bold"> Autonomously</span> Manages Your Business
            </p>
          </div>

          {/* APEX AI Logo */}
          <div className="mb-12 relative">
            <div className="w-48 h-48 mx-auto relative">
              <div className="w-full h-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-green rounded-full flex items-center justify-center animate-pulse-neon">
                <div className="text-8xl font-bold text-black">A</div>
              </div>
              {/* RGB Glow Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-0 border-4 border-gradient-to-r from-neon-blue to-neon-green rounded-full opacity-50" />
            </div>
            
            {/* Brand Text */}
            <div className="mt-8 text-center">
              <div className="text-4xl font-bold text-neon-blue neon-text mb-2 animate-glow">APEX</div>
              <div className="text-3xl font-bold text-neon-green neon-text">AI</div>
              <div className="text-sm text-gray-400 mt-2">Advanced Personal Executive Assistant</div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mb-12 relative">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/24d93c68-9f7d-4bc1-855f-4380a2ff26f6.png"
              alt="APEX AI Dashboard showcasing autonomous AI executive assistant with modern dark interface, RGB neon accents, and advanced analytics"
              className="mx-auto rounded-2xl shadow-2xl glass-morphism"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-rockstar-dark/50 to-transparent" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/dashboard" className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-black font-bold text-lg rounded-xl hover:shadow-neon-blue transition-all duration-300 transform hover:scale-105">
              Get Started Now
            </Link>
            <Link href="/chat" className="px-8 py-4 border-2 border-neon-blue text-neon-blue font-bold text-lg rounded-xl hover:bg-neon-blue/10 transition-all duration-300 neon-border">
              Try AI Assistant
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Autonomous Task Execution",
                description: "AI agents that independently manage workflows, emails, and scheduling",
                icon: "🤖"
              },
              {
                title: "Advanced Platform Integration",
                description: "Deep OAuth integration with Salesforce, Office 365, and 15+ platforms",
                icon: "🔗"
              },
              {
                title: "Intelligent Learning System",
                description: "Vector-based knowledge processing with behavior pattern recognition",
                icon: "🧠"
              },
              {
                title: "Multi-Modal Capabilities",
                description: "Process text, images, documents, and voice with advanced AI models",
                icon: "⚡"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-morphism rounded-xl p-6 border border-gray-700 hover:border-neon-blue/50 transition-all duration-500 transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-neon-blue mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Showcase */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-rockstar-gray/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-neon-blue neon-text mb-12">
            Integrates With Your Favorite Tools
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
            {[
              'Salesforce', 'Microsoft 365', 'Google Workspace', 'Slack', 'Jira',
              'Asana', 'Zoom', 'Teams', 'Discord', 'Notion'
            ].map((tool) => (
              <div key={tool} className="glass-morphism rounded-xl p-6 hover:border-neon-blue/50 border border-gray-700 transition-all duration-300">
                <div className="text-lg font-semibold text-gray-300">{tool}</div>
              </div>
            ))}
          </div>

          <div className="glass-morphism rounded-2xl p-8 max-w-4xl mx-auto">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c87e1cdb-a332-4759-a30d-a7bf61a4e0a8.png"
              alt="APEX AI Integration Dashboard displaying connected business platforms, OAuth flows, and automated workflows with RGB neon theme"
              className="rounded-xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-neon-blue/10 to-neon-green/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Reach Your <span className="text-neon-blue neon-text">APEX</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the next generation of executives who leverage autonomous AI for peak performance
          </p>
          <Link href="/dashboard" className="inline-block px-12 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-black font-bold text-xl rounded-xl hover:shadow-rockstar-glow transition-all duration-300 transform hover:scale-105">
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}