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
              <span className="text-neon-blue neon-text animate-glow">ROCKSTAR</span>
              <span className="text-neon-green neon-text ml-4">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Your AI-Powered Digital Employee That Makes You Look Like a 
              <span className="text-neon-blue font-bold"> Rockstar</span> at Work
            </p>
          </div>

          {/* Actual RockstarAI Logo */}
          <div className="mb-12 relative">
            <div className="w-48 h-48 mx-auto relative">
              <Image
                src="/rockstar-logo.png"
                alt="RockstarAI - 3D Liberty Star Logo with RGB Neon Glow"
                fill
                className="object-contain animate-pulse-neon"
                priority
              />
              {/* RGB Glow Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-green-500/20 to-purple-500/20 rounded-full blur-lg animate-pulse" />
              <div className="absolute inset-0 border-2 border-gradient-to-r from-neon-blue to-neon-green rounded-full opacity-30" />
            </div>
            
            {/* Brand Text */}
            <div className="mt-8 text-center">
              <div className="text-4xl font-bold text-neon-blue neon-text mb-2 animate-glow">ROCKSTAR</div>
              <div className="text-3xl font-bold text-neon-green neon-text">AI</div>
              <div className="text-sm text-gray-400 mt-2">Your AI Digital Employee</div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mb-12 relative">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/95716d9a-652a-4791-98da-8e4f3efdac11.png"
              alt="RockstarAI Dashboard showcasing AI digital employee interface with dark theme, RGB neon accents, and 3D star logo"
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
                title: "Intelligent Task Automation",
                description: "Learn from your daily patterns and automate repetitive workflows",
                icon: "🤖"
              },
              {
                title: "Seamless Integration",
                description: "Works with Salesforce, Office 365, and 50+ business tools",
                icon: "🔗"
              },
              {
                title: "Knowledge Base Learning",
                description: "Upload documents, emails, and messages to train your AI",
                icon: "📚"
              },
              {
                title: "Real-Time Assistance",
                description: "Get instant help with decisions, communication, and tasks",
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
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ca04299a-152c-4468-9cf1-3695e1975669.png"
              alt="Integration Dashboard displaying connected business tools and automated workflows with RGB neon theme"
              className="rounded-xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-neon-blue/10 to-neon-green/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Become a <span className="text-neon-blue neon-text">Rockstar</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who are already using AI to excel in their careers
          </p>
          <Link href="/dashboard" className="inline-block px-12 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-black font-bold text-xl rounded-xl hover:shadow-rockstar-glow transition-all duration-300 transform hover:scale-105">
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}