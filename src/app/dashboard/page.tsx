"use client"

import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({
    tasksAutomated: 1247,
    timeSaved: 156,
    integrationsActive: 8,
    aiAccuracy: 94.2
  })

  useEffect(() => {
    setMounted(true)
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        tasksAutomated: prev.tasksAutomated + Math.floor(Math.random() * 5),
        timeSaved: prev.timeSaved + Math.random() * 0.1
      }))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const recentActivities = [
    {
      type: 'autonomous',
      title: 'Autonomous workflow executed',
      description: 'Processed 23 leads, scheduled 8 follow-ups, updated CRM records',
      time: '3 minutes ago',
      icon: '🤖',
      status: 'success'
    },
    {
      type: 'integration',
      title: 'Multi-platform sync completed',
      description: 'Synchronized data across Salesforce, Office 365, and Slack',
      time: '12 minutes ago',
      icon: '🔗',
      status: 'success'
    },
    {
      type: 'intelligence',
      title: 'Behavioral pattern learned',
      description: 'Identified optimal meeting scheduling preferences',
      time: '25 minutes ago',
      icon: '🧠',
      status: 'processing'
    },
    {
      type: 'prediction',
      title: 'Predictive analysis generated',
      description: 'Forecasted Q1 performance and identified 3 key opportunities',
      time: '1 hour ago',
      icon: '📊',
      status: 'success'
    },
    {
      type: 'automation',
      title: 'Email intelligence activated',
      description: 'Automated 15 personalized responses matching your communication style',
      time: '2 hours ago',
      icon: '📧',
      status: 'success'
    }
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-apex-blue apex-text mb-2">
            APEX AI Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back! Your Advanced Personal Executive Assistant has been working autonomously.
          </p>
        </div>

        {/* Professional Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="professional-card rounded-xl p-6 hover:shadow-apex-glow transition-all animate-slide-up">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Tasks Automated</h3>
              <span className="success-element text-sm font-semibold px-2 py-1 rounded">+23%</span>
            </div>
            <div className="text-3xl font-bold text-apex-blue apex-text">
              {stats.tasksAutomated.toLocaleString()}
            </div>
            <div className="mt-2 h-2 bg-apex-gray rounded-full">
              <div className="h-2 bg-apex-blue rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="professional-card rounded-xl p-6 hover:shadow-apex-success transition-all animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Time Saved</h3>
              <span className="success-element text-sm font-semibold px-2 py-1 rounded">+18%</span>
            </div>
            <div className="text-3xl font-bold text-apex-success">
              {Math.round(stats.timeSaved)}h
            </div>
            <div className="mt-2 h-2 bg-apex-gray rounded-full">
              <div className="h-2 bg-apex-success rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>

          <div className="professional-card rounded-xl p-6 hover:shadow-apex-accent transition-all animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Integrations Active</h3>
              <span className="success-element text-sm font-semibold px-2 py-1 rounded">+2</span>
            </div>
            <div className="text-3xl font-bold text-apex-accent">
              {stats.integrationsActive}
            </div>
            <div className="mt-2 h-2 bg-apex-gray rounded-full">
              <div className="h-2 bg-apex-accent rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>

          <div className="professional-card rounded-xl p-6 hover:shadow-apex-glow transition-all animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm font-medium">AI Accuracy</h3>
              <span className="success-element text-sm font-semibold px-2 py-1 rounded">+1.5%</span>
            </div>
            <div className="text-3xl font-bold text-apex-blue apex-text">
              {stats.aiAccuracy}%
            </div>
            <div className="mt-2 h-2 bg-apex-gray rounded-full">
              <div className="h-2 bg-apex-blue rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Professional Activity Feed */}
          <div className="lg:col-span-2">
            <div className="professional-card rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-apex-blue mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-apex-slate/30 hover:bg-apex-slate/50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-apex-blue to-apex-blue-light rounded-lg flex items-center justify-center text-lg shadow-apex-glow">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">{activity.title}</h4>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          activity.status === 'success' ? 'success-element' :
                          activity.status === 'processing' ? 'status-processing text-white' :
                          'warning-element'
                        }`}>
                          {activity.status}
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">{activity.description}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Status & Quick Actions */}
          <div className="space-y-6">
            {/* Professional AI Status */}
            <div className="professional-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-apex-blue mb-4">APEX AI Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Behavioral Learning</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-apex-gray rounded-full h-2">
                      <div className="bg-apex-success h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                    <span className="text-apex-success text-sm font-semibold">89%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Platform Integrations</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-apex-gray rounded-full h-2">
                      <div className="bg-apex-blue h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                    <span className="text-apex-blue text-sm font-semibold">95%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Autonomous Execution</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-apex-gray rounded-full h-2">
                      <div className="bg-apex-accent h-2 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                    <span className="text-apex-accent text-sm font-semibold">97%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Predictive Accuracy</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-apex-gray rounded-full h-2">
                      <div className="bg-apex-blue h-2 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <span className="text-apex-blue text-sm font-semibold">91%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 success-element p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 status-online rounded-full"></div>
                  <span className="text-apex-success text-sm font-medium">Autonomous execution active</span>
                </div>
              </div>
            </div>

            {/* Professional Controls */}
            <div className="professional-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-apex-blue mb-4">Executive Controls</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-apex-blue/10 border border-apex-blue/30 hover:shadow-apex-glow transition-all text-left">
                  <span className="text-lg">🧠</span>
                  <div>
                    <div className="font-medium text-apex-blue">Train AI</div>
                    <div className="text-xs text-gray-400">Upload knowledge</div>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-apex-success/10 border border-apex-success/30 hover:shadow-apex-success transition-all text-left">
                  <span className="text-lg">⚙️</span>
                  <div>
                    <div className="font-medium text-apex-success">Configure Agent</div>
                    <div className="text-xs text-gray-400">Customize behavior</div>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-apex-accent/10 border border-apex-accent/30 hover:shadow-apex-accent transition-all text-left">
                  <span className="text-lg">📊</span>
                  <div>
                    <div className="font-medium text-apex-accent">Analytics</div>
                    <div className="text-xs text-gray-400">View insights</div>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-apex-blue/10 border border-apex-blue/30 hover:shadow-apex-glow transition-all text-left">
                  <span className="text-lg">🔄</span>
                  <div>
                    <div className="font-medium text-apex-blue">Auto Workflows</div>
                    <div className="text-xs text-gray-400">Manage automation</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}