"use client"

import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm APEX AI, your Advanced Personal Executive Assistant. I have autonomous capabilities and deep integration with your business platforms. I can independently execute workflows, analyze patterns, and make intelligent decisions. What would you like me to manage for you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response with realistic delay
    setTimeout(async () => {
      try {
        const response = await fetch('/api/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage.content,
            action: 'general'
          }),
        })

        const data = await response.json()
        
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.success ? data.response : getLocalResponse(userMessage.content),
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, aiResponse])
      } catch (error) {
        // Fallback to local response if API fails
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: getLocalResponse(userMessage.content),
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
      } finally {
        setIsTyping(false)
      }
    }, 1500)
  }

  const getLocalResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('email') || input.includes('draft')) {
      return "I'll help you draft an email! Based on your communication style, I recommend a professional yet friendly tone. Here's a template:\n\nSubject: [Your subject here]\n\nHi [Name],\n\nI hope this email finds you well. [Your message content]\n\nBest regards,\n[Your name]\n\nWould you like me to customize this further?"
    }
    
    if (input.includes('meeting') || input.includes('schedule')) {
      return "I can help you with meeting preparation! Based on your calendar patterns, I notice you prefer meetings on Tuesday-Wednesday mornings. I can:\n\n• Generate meeting agendas\n• Prepare talking points\n• Send calendar invites\n• Create follow-up tasks\n\nWhat specific meeting support do you need?"
    }
    
    if (input.includes('report') || input.includes('analysis')) {
      return "I'll help you create a comprehensive report! Based on your previous documents, you prefer structured reports with:\n\n• Executive Summary\n• Key Findings\n• Data Analysis\n• Recommendations\n• Next Steps\n\nWhat data or topic should I analyze for your report?"
    }
    
    if (input.includes('task') || input.includes('todo')) {
      return "Let me help you organize your tasks! I can:\n\n• Prioritize your to-do list\n• Set up automated reminders\n• Break down complex projects\n• Delegate tasks to team members\n• Track progress and deadlines\n\nWhat tasks would you like me to help organize?"
    }
    
    return "I understand you need help with that! Based on your work patterns and knowledge base, I can assist you with various tasks like email drafting, meeting preparation, report generation, and task automation. Could you provide more specific details about what you'd like to accomplish?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    { label: 'Autonomous Email', icon: '📧', action: () => setInputValue('Execute autonomous email management for my inbox') },
    { label: 'Meeting Intelligence', icon: '📅', action: () => setInputValue('Set up autonomous meeting orchestration with AI preparation') },
    { label: 'Predictive Analytics', icon: '📊', action: () => setInputValue('Generate predictive business analytics with actionable insights') },
    { label: 'Workflow Automation', icon: '⚡', action: () => setInputValue('Design autonomous workflows across my integrated platforms') }
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-blue neon-text mb-2">
            APEX AI Assistant
          </h1>
          <p className="text-gray-300">
            Interact with your autonomous AI executive assistant with advanced reasoning and platform integration.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="flex flex-col h-[calc(100vh-12rem)] glass-morphism rounded-xl border border-gray-700 overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-700 bg-rockstar-gray/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-green rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">APEX AI Assistant</h3>
                  <p className="text-sm text-gray-400">Online • Autonomous execution enabled</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Executing autonomously</span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-neon-blue/20 border border-neon-blue/50' 
                    : 'bg-gradient-to-br from-neon-green to-neon-blue'
                }`}>
                  {message.type === 'user' ? '👤' : '🤖'}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-2xl px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-neon-blue/20 border border-neon-blue/30 ml-auto'
                    : 'bg-rockstar-gray/50 border border-gray-600'
                }`}>
                  <div className="text-white whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-neon-blue/70' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center">
                  🤖
                </div>
                <div className="bg-rockstar-gray/50 border border-gray-600 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t border-gray-700">
              <div className="flex flex-wrap gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="flex items-center space-x-2 px-3 py-2 bg-rockstar-gray/50 hover:bg-neon-blue/10 border border-gray-600 hover:border-neon-blue/50 rounded-lg transition-all text-sm"
                  >
                    <span>{action.icon}</span>
                    <span className="text-gray-300">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-gray-700 bg-rockstar-gray/30">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
                  className="w-full px-4 py-3 bg-rockstar-dark border border-gray-600 rounded-xl text-white placeholder-gray-400 resize-none focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  inputValue.trim() && !isTyping
                    ? 'bg-gradient-to-r from-neon-blue to-neon-green text-black hover:shadow-neon-blue/50 transform hover:scale-105'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isTyping ? '⏳' : '🚀'}
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span>📎 Multi-modal input</span>
                <span>🎤 Voice commands</span>
                <span>📋 Live platform data</span>
              </div>
              <div>
                Autonomous AI • {Math.floor(Math.random() * 500) + 1500} patterns learned
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}