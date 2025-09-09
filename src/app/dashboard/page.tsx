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
      type: 'automation',
      title: 'Email responses automated',
      description: 'Handled 12 customer inquiries automatically',
      time: '2 minutes ago',
      icon: '📧',
      status: 'success'
    },
    {
      type: 'integration',
      title: 'Salesforce sync completed',
      description: 'Updated 45 customer records',
      time: '15 minutes ago',
      icon: '🔄',
      status: 'success'
    },
    {
      type: 'learning',
      title: 'Knowledge base updated',
      description: 'Processed 3 new documents',
      time: '1 hour ago',
      icon: '📚',
      status: 'processing'
    },
    {
      type: 'task',
      title: 'Meeting preparation completed',
      description: 'Generated agenda and talking points for 3pm meeting',
      time: '2 hours ago',
      icon: '📋',
      status: 'success'
    }
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-blue neon-text mb-2">
            Dashboard
          </h1>
          <p className="text-gray-300">
            Welcome back! Here's what your AI has been up to.
          </p>
        </div>

        {/* Real-time Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-morphism rounded-xl p-6 border border-neon-blue/30 hover:border-neon-blue transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Tasks Automated</h3>
              <span className="text-neon-green text-sm font-bold">+23%</span>
            </div>
            <div className="text-3xl font-bold text-neon-blue neon-text">
              {stats.tasksAutomated.toLocaleString()}
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-neon-blue rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="glass-morphism rounded-xl p-6 border border-neon-green/30 hover:border-neon-green transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Time Saved</h3>
              <span className="text-neon-green text-sm font-bold">+18%</span>
            </div>
            <div className="text-3xl font-bold text-neon-green neon-text">
              {Math.round(stats.timeSaved)}h
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-neon-green rounded-full animate-pulse" style={{ width: '82%' }}></div>
            </div>
          </div>

          <div className="glass-morphism rounded-xl p-6 border border-neon-purple/30 hover:border-neon-purple transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Integrations Active</h3>
              <span className="text-neon-green text-sm font-bold">+2</span>
            </div>
            <div className="text-3xl font-bold text-neon-purple neon-text">
              {stats.integrationsActive}
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-neon-purple rounded-full animate-pulse" style={{ width: '90%' }}></div>
            </div>
          </div>

          <div className="glass-morphism rounded-xl p-6 border border-neon-pink/30 hover:border-neon-pink transition-all">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-gray-400 text-sm font-medium">AI Accuracy</h3>
              <span className="text-neon-green text-sm font-bold">+1.5%</span>
            </div>
            <div className="text-3xl font-bold text-neon-pink neon-text">
              {stats.aiAccuracy}%
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-neon-pink rounded-full animate-pulse" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2">
            <div className="glass-morphism rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-neon-green mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-rockstar-gray/50 hover:bg-rockstar-gray transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center text-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">{activity.title}</h4>
                        <div className={`px-2 py-1 rounded-full text-xs ${
                          activity.status === 'success' ? 'bg-neon-green/20 text-neon-green' :
                          activity.status === 'processing' ? 'bg-neon-blue/20 text-neon-blue' :
                          'bg-gray-600/20 text-gray-400'
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
            {/* AI Status */}
            <div className="glass-morphism rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-neon-blue mb-4">AI Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Learning Progress</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-neon-green h-2 rounded-full animate-pulse" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-neon-green text-sm font-bold">78%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Integration Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-neon-blue h-2 rounded-full animate-pulse" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-neon-blue text-sm font-bold">92%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Performance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div className="bg-neon-purple h-2 rounded-full animate-pulse" style={{ width: '94%' }}></div>
                    </div>
                    <span className="text-neon-purple text-sm font-bold">94%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-neon-green/10 rounded-lg border border-neon-green/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-neon-green text-sm font-semibold">AI is actively learning</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-morphism rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-neon-purple mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-neon-blue/10 border border-neon-blue/30 hover:border-neon-blue transition-all text-left">
                  <span className="text-xl">📚</span>
                  <div>
                    <div className="font-semibold text-neon-blue">Add Knowledge</div>
                    <div className="text-xs text-gray-400">Upload documents</div>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-neon-green/10 border border-neon-green/30 hover:border-neon-green transition-all text-left">
                  <span className="text-xl">🔗</span>
                  <div>
                    <div className="font-semibold text-neon-green">Connect Apps</div>
                    <div className="text-xs text-gray-400">Add integrations</div>
                  </div>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-neon-purple/10 border border-neon-purple/30 hover:border-neon-purple transition-all text-left">
                  <span className="text-xl">💬</span>
                  <div>
                    <div className="font-semibold text-neon-purple">AI Chat</div>
                    <div className="text-xs text-gray-400">Get assistance</div>
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