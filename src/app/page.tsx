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
          {/* Professional Hero Title */}
          <div className="mb-8 animate-slide-up">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-apex-blue apex-text animate-glow-subtle">APEX</span>
              <span className="text-apex-accent ml-4 font-semibold">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Advanced Personal Executive Assistant That 
              <span className="text-apex-accent font-semibold"> Intelligently</span> Manages Your Enterprise
            </p>
          </div>

          {/* Professional APEX AI Logo */}
          <div className="mb-12 relative">
            <div className="w-48 h-48 mx-auto relative">
              <div className="w-full h-full bg-gradient-to-br from-apex-blue to-apex-blue-light rounded-2xl flex items-center justify-center animate-pulse-professional shadow-apex-glow-strong">
                <div className="text-6xl font-bold text-white">A</div>
              </div>
              {/* Professional glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-apex-blue/10 to-apex-teal/10 rounded-2xl blur-xl animate-pulse-professional" />
            </div>
            
            {/* Brand Text */}
            <div className="mt-8 text-center">
              <div className="text-4xl font-bold text-apex-blue apex-text mb-2 animate-glow-subtle">APEX</div>
              <div className="text-3xl font-semibold text-apex-accent">AI</div>
              <div className="text-sm text-gray-400 mt-2 font-medium">Advanced Personal Executive Assistant</div>
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

          {/* Professional CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/dashboard" className="professional-button px-8 py-4 text-white font-semibold text-lg rounded-xl">
              Get Started Now
            </Link>
            <Link href="/chat" className="px-8 py-4 border-2 border-apex-blue text-apex-blue font-semibold text-lg rounded-xl hover:bg-apex-blue/10 transition-all duration-300 apex-border">
              Try AI Assistant
            </Link>
          </div>

          {/* Professional Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Autonomous Execution",
                description: "AI agents that independently manage workflows, emails, and scheduling with enterprise-grade reliability",
                icon: "⚙️",
                color: "apex-blue"
              },
              {
                title: "Enterprise Integration",
                description: "Secure OAuth integration with Salesforce, Office 365, and 15+ business platforms",
                icon: "🔗",
                color: "apex-success"
              },
              {
                title: "Intelligent Analytics",
                description: "Advanced behavioral learning with predictive insights and performance optimization",
                icon: "📊",
                color: "apex-accent"
              },
              {
                title: "Multi-Modal Processing",
                description: "Process text, documents, images, and voice with state-of-the-art AI models",
                icon: "🧠",
                color: "apex-blue"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="professional-card rounded-xl p-6 hover:shadow-apex-glow transition-all duration-500 transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-3 text-${feature.color}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
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

      {/* Professional CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-apex-blue/5 to-apex-teal/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Reach Your <span className="text-apex-blue apex-text">APEX</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join forward-thinking executives who leverage intelligent automation for superior business outcomes
          </p>
          <Link href="/dashboard" className="professional-button inline-block px-12 py-4 text-white font-semibold text-xl rounded-xl">
            Start Your Enterprise Trial
          </Link>
        </div>
      </section>
    </div>
  )
}