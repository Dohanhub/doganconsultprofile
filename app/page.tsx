'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Sword, 
  MessageSquare, 
  Zap, 
  Brain, 
  Target, 
  Users,
  Sparkles,
  Trophy,
  Star,
  ArrowRight
} from 'lucide-react'

export default function Home() {
  const [gamingStatus, setGamingStatus] = useState({
    battleArena: 'active',
    debateMode: 'active',
    magicSystem: 'active',
    aiAgents: 'active'
  })

  const [selectedFeature, setSelectedFeature] = useState('battle')

  const gamingFeatures = [
    {
      id: 'battle',
      name: 'Battle Arena',
      description: 'AI agent competitions and strategy battles',
      icon: Sword,
      color: 'from-gaming-battle to-red-900',
      status: gamingStatus.battleArena
    },
    {
      id: 'debate',
      name: 'Debate Mode',
      description: 'Three-way AI discussions on business topics',
      icon: MessageSquare,
      color: 'from-gaming-debate to-yellow-900',
      status: gamingStatus.debateMode
    },
    {
      id: 'magic',
      name: 'Magic System',
      description: 'Architecture potions and code golf spells',
      icon: Sparkles,
      color: 'from-magical-potion to-purple-900',
      status: gamingStatus.magicSystem
    },
    {
      id: 'agents',
      name: 'AI Agents',
      description: 'Professional and technical consultation',
      icon: Brain,
      color: 'from-gaming-professional to-indigo-900',
      status: gamingStatus.aiAgents
    }
  ]

  const aiAgents = [
    {
      name: 'Consult Professional',
      role: 'Business Strategy Expert',
      level: 85,
      specialty: 'Strategic planning and business development',
      icon: Target,
      color: 'from-gaming-professional to-indigo-900'
    },
    {
      name: 'Consult Technical',
      role: 'Technical Architecture Guide',
      level: 88,
      specialty: 'Technical solutions and architecture design',
      icon: Zap,
      color: 'from-gaming-technical to-blue-900'
    }
  ]

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
            <h1 className="text-6xl font-bold text-white mb-4">
              <span className="text-glow text-gaming-magic">DoganConsult</span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Gaming Paradise Strategy Arena
            </p>
            <p className="text-lg text-gray-400">
              Professional Business Consultation with AI Agents
            </p>
            <div className="flex justify-center items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Gaming Paradise v2.0 Active</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="w-4 h-4" />
                <span>Magic Level 2</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Gaming Features Grid */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {gamingFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`gaming-card bg-gradient-to-br ${feature.color} cursor-pointer transform hover:scale-105 transition-all duration-300`}
              onClick={() => setSelectedFeature(feature.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <feature.icon className="w-8 h-8 text-white" />
                <div className={`px-2 py-1 rounded text-xs font-semibold ${
                  feature.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {feature.status}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.name}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Agents Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            AI Agents <span className="text-gaming-magic">Active</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiAgents.map((agent, index) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className={`ai-agent bg-gradient-to-br ${agent.color}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <agent.icon className="w-8 h-8 text-white" />
                    <div>
                      <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                      <p className="text-gray-300 text-sm">{agent.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">Lv.{agent.level}</div>
                    <div className="text-xs text-gray-300">Level</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{agent.specialty}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm">Online</span>
                  </div>
                  <button className="magical-button text-sm">
                    Consult <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="gaming-card"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Gaming Paradise Status
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">2</div>
              <div className="text-sm text-gray-300">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">4</div>
              <div className="text-sm text-gray-300">Gaming Features</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">2</div>
              <div className="text-sm text-gray-300">Magic Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">100%</div>
              <div className="text-sm text-gray-300">System Health</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <p className="text-gray-400">
          © 2025 DoganConsult - Gaming Paradise Strategy Arena
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Powered by Next.js, React, TypeScript & Gaming Paradise v2.0
        </p>
      </footer>
    </div>
  )
}
