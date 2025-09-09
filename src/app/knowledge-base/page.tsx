"use client"

import { useState, useEffect, useCallback } from 'react'

export default function KnowledgeBasePage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('upload')
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    name: string
    size: number
    type: string
    status: 'uploading' | 'processing' | 'completed' | 'error'
    progress: number
  }>>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFiles = async (files: File[]) => {
    setUploading(true)
    
    for (const file of files) {
      const fileData = {
        name: file.name,
        size: file.size,
        type: getFileType(file.name),
        status: 'uploading' as const,
        progress: 0
      }
      
      setUploadedFiles(prev => [...prev, fileData])
      
      // Simulate realistic upload process
      await simulateUpload(fileData, file)
    }
    
    setUploading(false)
  }

  const simulateUpload = async (fileData: any, file: File) => {
    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        
        setUploadedFiles(prev => 
          prev.map(f => 
            f.name === fileData.name 
              ? { ...f, progress: Math.min(progress, 100) }
              : f
          )
        )
        
        if (progress >= 100) {
          clearInterval(interval)
          
          // Start processing phase
          setTimeout(() => {
            setUploadedFiles(prev => 
              prev.map(f => 
                f.name === fileData.name 
                  ? { ...f, status: 'processing', progress: 0 }
                  : f
              )
            )
            
            // Complete processing
            setTimeout(() => {
              setUploadedFiles(prev => 
                prev.map(f => 
                  f.name === fileData.name 
                    ? { ...f, status: 'completed', progress: 100 }
                    : f
                )
              )
              resolve(true)
            }, 2000)
          }, 500)
        }
      }, 100)
    })
  }

  const getFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf': return 'PDF Document'
      case 'doc':
      case 'docx': return 'Word Document'
      case 'xls':
      case 'xlsx': return 'Excel Spreadsheet'
      case 'txt': return 'Text File'
      case 'json': return 'JSON Data'
      case 'csv': return 'CSV Data'
      default: return 'Unknown'
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'uploading': return 'text-neon-blue'
      case 'processing': return 'text-neon-purple'
      case 'completed': return 'text-neon-green'
      case 'error': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploading': return '⬆️'
      case 'processing': return '⚙️'
      case 'completed': return '✅'
      case 'error': return '❌'
      default: return '📄'
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neon-blue neon-text mb-2">
            Knowledge Base
          </h1>
          <p className="text-gray-300">
            Upload and manage your documents, emails, and communication patterns to train your AI assistant.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass-morphism rounded-xl p-6 border-2 border-neon-blue/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Total Documents</h3>
              <span className="text-2xl">📚</span>
            </div>
            <div className="text-3xl font-bold text-neon-blue neon-text">
              {247 + uploadedFiles.filter(f => f.status === 'completed').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">+{uploadedFiles.filter(f => f.status === 'completed').length} this session</p>
          </div>

          <div className="glass-morphism rounded-xl p-6 border-2 border-neon-green/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Patterns Learned</h3>
              <span className="text-2xl">🧠</span>
            </div>
            <div className="text-3xl font-bold text-neon-green neon-text">1,889</div>
            <p className="text-xs text-gray-500 mt-1">+156 today</p>
          </div>

          <div className="glass-morphism rounded-xl p-6 border-2 border-neon-purple/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Processing Queue</h3>
              <span className="text-2xl">⏳</span>
            </div>
            <div className="text-3xl font-bold text-neon-purple neon-text">
              {uploadedFiles.filter(f => f.status === 'processing').length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Est. 5 min</p>
          </div>

          <div className="glass-morphism rounded-xl p-6 border-2 border-neon-pink/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Accuracy Score</h3>
              <span className="text-2xl">🎯</span>
            </div>
            <div className="text-3xl font-bold text-neon-pink neon-text">94.2%</div>
            <p className="text-xs text-gray-500 mt-1">+2.1% improvement</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-rockstar-gray/50 p-1 rounded-lg w-fit">
            {['upload', 'documents', 'insights'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-md text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue'
                    : 'text-gray-400 hover:text-neon-blue'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'upload' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Interface */}
              <div className="glass-morphism rounded-xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-neon-green mb-6">Upload Knowledge</h2>
                
                {/* Drop Zone */}
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-neon-blue bg-neon-blue/10 scale-105' 
                      : 'border-gray-600 hover:border-neon-blue/50 hover:bg-neon-blue/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.json,.csv"
                  />
                  
                  <div className="space-y-4">
                    {dragActive ? (
                      <>
                        <div className="text-6xl animate-bounce">📁</div>
                        <div>
                          <h3 className="text-xl font-semibold text-neon-blue">Drop files here!</h3>
                          <p className="text-gray-400">Release to upload your knowledge base</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-6xl">📤</div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">Upload Your Knowledge</h3>
                          <p className="text-gray-400 mb-4">
                            Drag and drop files here, or click to browse
                          </p>
                          <button className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-green text-black font-semibold rounded-lg hover:shadow-neon-blue/50 transition-all duration-300">
                            Choose Files
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-6 text-xs text-gray-500">
                    Supported formats: PDF, Word, Excel, Text, JSON, CSV (Max 10MB per file)
                  </div>
                </div>

                {/* Upload Progress */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6 glass-morphism rounded-xl border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700">
                      <h3 className="font-semibold text-white">Upload Progress</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="p-4 border-b border-gray-700/50 last:border-b-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <span className="text-lg">{getStatusIcon(file.status)}</span>
                              <div className="min-w-0 flex-1">
                                <div className="font-medium text-white truncate">{file.name}</div>
                                <div className="text-xs text-gray-400">
                                  {file.type} • {formatFileSize(file.size)}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-medium capitalize ${getStatusColor(file.status)}`}>
                                {file.status}
                              </div>
                              <div className="text-xs text-gray-400">{Math.round(file.progress)}%</div>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                file.status === 'completed' ? 'bg-neon-green' :
                                file.status === 'processing' ? 'bg-neon-purple' :
                                file.status === 'error' ? 'bg-red-400' : 'bg-neon-blue'
                              }`}
                              style={{ width: `${file.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Tips */}
              <div className="space-y-6">
                <div className="glass-morphism rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-neon-blue mb-4">💡 Upload Tips</h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-start space-x-2">
                      <span className="text-neon-green">•</span>
                      <span>Upload your email archives to learn your communication style</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-neon-blue">•</span>
                      <span>Include meeting notes and project documents for context</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-neon-purple">•</span>
                      <span>Add company policies and procedures for compliance</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-neon-pink">•</span>
                      <span>Import chat logs from Slack, Teams, or Discord</span>
                    </div>
                  </div>
                </div>

                <div className="glass-morphism rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-neon-purple mb-4">📋 Supported Formats</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                      <span className="text-gray-300">PDF Documents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-neon-green rounded-full"></span>
                      <span className="text-gray-300">Word Files (.docx)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-neon-purple rounded-full"></span>
                      <span className="text-gray-300">Excel Sheets</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-neon-pink rounded-full"></span>
                      <span className="text-gray-300">Email Archives</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-neon-blue rounded-full"></span>
                      <span className="text-gray-300">Text Files</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-neon-green rounded-full"></span>
                      <span className="text-gray-300">JSON Data</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="glass-morphism rounded-xl border border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-neon-green">Document Library</h2>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Your documents will appear here</h3>
                  <p className="text-gray-500">Upload files in the Upload tab to see them listed here</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="glass-morphism rounded-xl p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-neon-purple mb-6">Learning Insights</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-neon-blue mb-4">Communication Patterns</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Professional Tone</span>
                        <span className="text-neon-blue font-medium">87%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Technical Vocabulary</span>
                        <span className="text-neon-green font-medium">94%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Response Time</span>
                        <span className="text-neon-purple font-medium">2h avg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Preferred Format</span>
                        <span className="text-neon-pink font-medium">Bullet Points</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-neon-green mb-4">Work Patterns</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Peak Hours</span>
                        <span className="text-neon-blue font-medium">9AM - 11AM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Meeting Preference</span>
                        <span className="text-neon-green font-medium">Tues/Wed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Task Priority</span>
                        <span className="text-neon-purple font-medium">Urgent First</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Break Schedule</span>
                        <span className="text-neon-pink font-medium">2:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}