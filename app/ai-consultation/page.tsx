'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  MessageSquare, 
  Zap, 
  Target, 
  Users,
  Sparkles,
  Trophy,
  Star,
  ArrowRight,
  Bot,
  Cpu,
  Lightbulb
} from 'lucide-react'

export default function AIConsultation() {
  const [selectedService, setSelectedService] = useState('strategy')

  const aiServices = [
    {
      id: 'strategy',
      name: 'AI Strategy Consulting',
      description: 'Comprehensive AI implementation strategies for enterprise transformation',
      icon: Target,
      color: 'from-blue-600 to-indigo-700',
      features: [
        'AI Roadmap Development',
        'Technology Stack Selection',
        'ROI Analysis & Forecasting',
        'Change Management Planning'
      ]
    },
    {
      id: 'implementation',
      name: 'AI Implementation',
      description: 'End-to-end AI solution deployment and integration services',
      icon: Cpu,
      color: 'from-green-600 to-emerald-700',
      features: [
        'Custom AI Model Development',
        'API Integration & Deployment',
        'Performance Optimization',
        'Scalability Planning'
      ]
    },
    {
      id: 'analytics',
      name: 'AI Analytics & Insights',
      description: 'Advanced analytics and business intelligence powered by AI',
      icon: Brain,
      color: 'from-purple-600 to-violet-700',
      features: [
        'Predictive Analytics',
        'Business Intelligence Dashboards',
        'Data Visualization',
        'Real-time Monitoring'
      ]
    }
  ]

  const consultationFeatures = [
    {
      title: 'Live AI Assistant',
      description: '24/7 intelligent consultation with our advanced AI agents',
      icon: Bot,
      color: 'text-blue-400'
    },
    {
      title: 'Interactive Analytics',
      description: 'Real-time data visualization and interactive reporting',
      icon: Lightbulb,
      color: 'text-green-400'
    },
    {
      title: 'Strategic Planning',
      description: 'AI-powered strategic planning and decision support',
      icon: Target,
      color: 'text-purple-400'
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
              <a href="/dashboard" className="text-white hover:text-gaming-magic transition-colors duration-300">Dashboard</a>
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
              AI-Powered <span className="text-gaming-magic">Business Consultation</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Transform your business with cutting-edge AI solutions and strategic insights
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>AI Agents Online</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="w-4 h-4" />
                <span>Advanced Analytics</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* AI Services Grid */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {aiServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`gaming-card bg-gradient-to-br ${service.color} cursor-pointer transform hover:scale-105 transition-all duration-300`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <service.icon className="w-8 h-8 text-white" />
                <div className="px-2 py-1 rounded text-xs font-semibold bg-white bg-opacity-20 text-white">
                  Active
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Consultation Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Consultation <span className="text-gaming-magic">Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultationFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="gaming-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="gaming-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-300 mb-6">
              Schedule a consultation with our AI experts and discover how artificial intelligence can revolutionize your operations.
            </p>
            <button className="magical-button">
              Schedule Consultation <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <p className="text-gray-400">
          © 2025 DoganConsult - AI-Powered Business Consultation
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Powered by Next.js, React, TypeScript & Advanced AI
        </p>
      </footer>
    </div>
  )
}
