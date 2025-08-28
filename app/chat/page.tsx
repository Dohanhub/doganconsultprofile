'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageSquare,
  Send,
  Bot,
  User,
  Sparkles,
  Target,
  Zap,
  Brain,
  ArrowRight,
  Clock,
  CheckCircle
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  agent?: string
  agentName?: string
  timestamp: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [selectedAgent, setSelectedAgent] = useState('consult-professional')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(`session-${Date.now()}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const agents = [
    {
      id: 'consult-professional',
      name: 'Consult Professional',
      role: 'Business Strategy Expert',
      icon: Target,
      color: 'from-blue-600 to-indigo-700',
      description: 'Strategic planning and business development'
    },
    {
      id: 'consult-technical',
      name: 'Consult Technical',
      role: 'Technical Architecture Guide',
      icon: Zap,
      color: 'from-green-600 to-emerald-700',
      description: 'Technical solutions and architecture design'
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      text: `Welcome to DoganConsult AI Chat! I'm ${agents.find(a => a.id === selectedAgent)?.name}, your ${agents.find(a => a.id === selectedAgent)?.role}. How can I help you today?`,
      sender: 'ai',
      agent: selectedAgent,
      agentName: agents.find(a => a.id === selectedAgent)?.name,
      timestamp: new Date().toISOString()
    }
    setMessages([welcomeMessage])
  }, [selectedAgent])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          agent: selectedAgent,
          sessionId
        }),
      })

      const result = await response.json()

      if (result.success) {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          text: result.response.message,
          sender: 'ai',
          agent: result.response.agent,
          agentName: result.response.agentName,
          timestamp: result.response.timestamp
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'ai',
          agent: selectedAgent,
          agentName: agents.find(a => a.id === selectedAgent)?.name,
          timestamp: new Date().toISOString()
        }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        agent: selectedAgent,
        agentName: agents.find(a => a.id === selectedAgent)?.name,
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-background">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="flex space-x-6">
              <a href="/" className="text-white hover:text-gaming-magic transition-colors duration-300">Home</a>
              <a href="/ai-consultation" className="text-white hover:text-gaming-magic transition-colors duration-300">AI Consultation</a>
              <a href="/services" className="text-white hover:text-gaming-magic transition-colors duration-300">Services</a>
              <a href="/booking" className="text-white hover:text-gaming-magic transition-colors duration-300">Booking</a>
              <a href="/chat" className="text-white hover:text-gaming-magic transition-colors duration-300">Live Chat</a>
              <a href="/test" className="text-white hover:text-gaming-magic transition-colors duration-300">Test</a>
              <a href="/contact" className="text-white hover:text-gaming-magic transition-colors duration-300">Contact</a>
            </div>
          </motion.nav>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              Live AI <span className="text-gaming-magic">Chat</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Get instant consultation from our AI experts
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI Agents Online</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="w-4 h-4" />
                <span>Gaming Paradise Active</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Agent Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="gaming-card">
              <h2 className="text-2xl font-bold text-white mb-6">Select AI Agent</h2>
              <div className="space-y-4">
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent.id)}
                    className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                      selectedAgent === agent.id
                        ? `border-gaming-magic bg-gradient-to-r ${agent.color} text-white`
                        : 'border-white border-opacity-20 text-gray-300 hover:border-gaming-magic hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <agent.icon className="w-6 h-6" />
                      <div>
                        <h3 className="font-semibold">{agent.name}</h3>
                        <p className="text-sm opacity-80">{agent.role}</p>
                      </div>
                    </div>
                    <p className="text-sm opacity-80">{agent.description}</p>
                  </button>
                ))}
              </div>

              {/* Gaming Paradise Status */}
              <div className="mt-8 bg-white bg-opacity-5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Gaming Paradise Status
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Battle Arena</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Debate Mode</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Magic System</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">System Health</span>
                    <span className="text-green-400">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="gaming-card h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white border-opacity-20">
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8 text-gaming-magic" />
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {agents.find(a => a.id === selectedAgent)?.name}
                    </h2>
                    <p className="text-sm text-gray-300">
                      {agents.find(a => a.id === selectedAgent)?.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-4 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gaming-magic text-white'
                        : 'bg-white bg-opacity-10 text-white'
                    }`}>
                      {message.sender === 'ai' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-4 h-4" />
                          <span className="text-sm font-semibold">{message.agentName}</span>
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs opacity-60">
                        <Clock className="w-3 h-3" />
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white bg-opacity-10 text-white p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gaming-magic rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gaming-magic rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gaming-magic rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="text-sm">AI is typing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gaming-magic focus:border-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-6 py-3 bg-gaming-magic text-white rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <p className="text-gray-400">
          © 2025 DoganConsult - Live AI Chat Services
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Powered by Next.js, React, TypeScript & Gaming Paradise v2.0
        </p>
      </footer>
    </div>
  )
}
