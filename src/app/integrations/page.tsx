"use client"

import { useState, useEffect } from 'react'

export default function IntegrationsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [connections, setConnections] = useState<{[key: string]: boolean}>({})

  const integrations = [
    {
      id: 1,
      name: 'Salesforce',
      description: 'Sync customer data, automate lead management, and generate reports',
      category: 'crm',
      status: 'connected',
      icon: '☁️',
      features: ['Lead Scoring', 'Auto Data Entry', 'Report Generation'],
      setupTime: '5 min',
      popularity: 95
    },
    {
      id: 2,
      name: 'Microsoft Office 365',
      description: 'Email automation, calendar optimization, and document processing',
      category: 'productivity',
      status: 'available',
      icon: '📧',
      features: ['Email Draft', 'Calendar Sync', 'Document Analysis'],
      setupTime: '3 min',
      popularity: 92
    },
    {
      id: 3,
      name: 'Slack',
      description: 'Automated responses, meeting summaries, and team communication',
      category: 'communication',
      status: 'available',
      icon: '💬',
      features: ['Auto Response', 'Meeting Notes', 'Team Analytics'],
      setupTime: '2 min',
      popularity: 89
    },
    {
      id: 4,
      name: 'Google Workspace',
      description: 'Gmail automation, Drive integration, and calendar management',
      category: 'productivity',
      status: 'available',
      icon: '🌐',
      features: ['Gmail Automation', 'Drive Sync', 'Calendar AI'],
      setupTime: '4 min',
      popularity: 94
    },
    {
      id: 5,
      name: 'Zoom',
      description: 'Meeting transcription, automated scheduling, and follow-up generation',
      category: 'communication',
      status: 'available',
      icon: '📹',
      features: ['Auto Transcription', 'Meeting Prep', 'Follow-up Tasks'],
      setupTime: '3 min',
      popularity: 87
    },
    {
      id: 6,
      name: 'Jira',
      description: 'Project tracking, automated ticket creation, and sprint planning',
      category: 'project-management',
      status: 'available',
      icon: '📊',
      features: ['Ticket Auto-creation', 'Sprint Planning', 'Progress Reports'],
      setupTime: '6 min',
      popularity: 83
    }
  ]

  useEffect(() => {
    setMounted(true)
    // Initialize Salesforce as connected
    setConnections({ 1: true })
  }, [])

  const categories = [
    { id: 'all', label: 'All Integrations', count: integrations.length },
    { id: 'crm', label: 'CRM & Sales', count: integrations.filter(i => i.category === 'crm').length },
    { id: 'productivity', label: 'Productivity', count: integrations.filter(i => i.category === 'productivity').length },
    { id: 'communication', label: 'Communication', count: integrations.filter(i => i.category === 'communication').length },
    { id: 'project-management', label: 'Project Management', count: integrations.filter(i => i.category === 'project-management').length }
  ]

  const filteredIntegrations = activeCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === activeCategory)

  const connectedCount = Object.keys(connections).filter(key => connections[key]).length
  const availableCount = integrations.length - connectedCount

  const handleConnect = (id: number) => {
    setConnections(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-blue neon-text mb-2">
            Integrations
          </h1>
          <p className="text-gray-300">
            Connect RockstarAI with your favorite tools and platforms to supercharge your workflow.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="glass-morphism rounded-xl p-6 border-2 border-neon-green/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Connected</h3>
              <span className="text-2xl">🔗</span>
            </div>
            <div className="text-3xl font-bold text-neon-green neon-text">{connectedCount}</div>
            <p className="text-xs text-gray-500 mt-1">Active integrations</p>
          </div>

          <div className="glass-morphism rounded-xl p-6 border-2 border-neon-blue/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Available</h3>
              <span className="text-2xl">📱</span>
            </div>
            <div className="text-3xl font-bold text-neon-blue neon-text">{availableCount}</div>
            <p className="text-xs text-gray-500 mt-1">Ready to connect</p>
          </div>

          <div className="glass-morphism rounded-xl p-6 border-2 border-neon-purple/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Data Synced</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-3xl font-bold text-neon-purple neon-text">2.4TB</div>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>

          <div className="glass-morphism rounded-xl p-6 border-2 border-neon-pink/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Automations</h3>
              <span className="text-2xl">🤖</span>
            </div>
            <div className="text-3xl font-bold text-neon-pink neon-text">{connectedCount * 12}</div>
            <p className="text-xs text-gray-500 mt-1">Active workflows</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue'
                    : 'text-gray-400 hover:text-neon-blue hover:bg-neon-blue/5 border border-gray-700'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredIntegrations.map((integration) => {
            const isConnected = connections[integration.id] || integration.status === 'connected'
            
            return (
              <div 
                key={integration.id}
                className={`glass-morphism rounded-xl p-6 border transition-all duration-300 hover:scale-105 ${
                  isConnected
                    ? 'border-neon-green/50 bg-neon-green/5' 
                    : 'border-gray-700 hover:border-neon-blue/50'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{integration.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium capitalize ${
                          isConnected ? 'text-neon-green' : 'text-gray-400'
                        }`}>
                          {isConnected ? 'Connected' : 'Available'}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-xs text-gray-400">{integration.setupTime} setup</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Popularity Badge */}
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-1">Popularity</div>
                    <div className="flex items-center space-x-1">
                      <div className="w-12 bg-gray-700 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${
                            integration.popularity >= 90 ? 'bg-neon-green' :
                            integration.popularity >= 80 ? 'bg-neon-blue' : 'bg-neon-purple'
                          }`}
                          style={{ width: `${integration.popularity}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{integration.popularity}%</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4">{integration.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <div className="text-xs text-gray-400 mb-2 font-medium">Key Features:</div>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-rockstar-gray text-xs rounded-full text-gray-300 border border-gray-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div>
                  {isConnected ? (
                    <div className="space-y-2">
                      <div className="w-full px-4 py-2 bg-neon-green/20 text-neon-green border border-neon-green/30 rounded-lg text-center text-sm font-medium">
                        ✓ Connected
                      </div>
                      <button 
                        onClick={() => handleConnect(integration.id)}
                        className="w-full px-4 py-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-colors text-sm"
                      >
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(integration.id)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-green text-black font-medium rounded-lg hover:shadow-neon-blue/50 transition-all duration-300 text-sm"
                    >
                      Connect Now
                    </button>
                  )}
                </div>

                {/* Connection Stats */}
                {isConnected && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="text-center">
                        <div className="text-neon-blue font-bold">{Math.floor(Math.random() * 1000) + 200}</div>
                        <div className="text-gray-400">Actions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-neon-green font-bold">98.{Math.floor(Math.random() * 9) + 1}%</div>
                        <div className="text-gray-400">Success</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Custom Integration Request */}
        <div className="glass-morphism rounded-xl border border-gray-700 p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🔧</div>
            <h2 className="text-2xl font-bold text-neon-blue mb-4">Need a Custom Integration?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Don't see your favorite tool here? Request a custom integration and our team will build it for you. 
              Most custom integrations are completed within 2-3 weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-neon-blue to-neon-green text-black font-semibold rounded-lg hover:shadow-rockstar-glow transition-all duration-300">
                Request Integration
              </button>
              <button className="px-8 py-3 border-2 border-neon-blue text-neon-blue font-semibold rounded-lg hover:bg-neon-blue/10 transition-all duration-300">
                View API Docs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}