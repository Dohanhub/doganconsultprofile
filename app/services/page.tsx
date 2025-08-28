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
  Lightbulb,
  BarChart3,
  Shield,
  Globe,
  Code
} from 'lucide-react'

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const serviceCategories = [
    { id: 'all', name: 'All Services', color: 'from-primary-600 to-primary-700' },
    { id: 'ai', name: 'AI Solutions', color: 'from-purple-600 to-violet-700' },
    { id: 'strategy', name: 'Strategy', color: 'from-blue-600 to-indigo-700' },
    { id: 'technical', name: 'Technical', color: 'from-green-600 to-emerald-700' }
  ]

  const services = [
    {
      id: 'ai-strategy',
      name: 'AI Strategy Consulting',
      description: 'Comprehensive AI implementation strategies for enterprise transformation',
      category: 'ai',
      icon: Brain,
      color: 'from-purple-600 to-violet-700',
      features: [
        'AI Roadmap Development',
        'Technology Stack Selection',
        'ROI Analysis & Forecasting',
        'Change Management Planning'
      ],
      price: 'From $5,000'
    },
    {
      id: 'ai-implementation',
      name: 'AI Implementation',
      description: 'End-to-end AI solution deployment and integration services',
      category: 'ai',
      icon: Cpu,
      color: 'from-blue-600 to-indigo-700',
      features: [
        'Custom AI Model Development',
        'API Integration & Deployment',
        'Performance Optimization',
        'Scalability Planning'
      ],
      price: 'From $10,000'
    },
    {
      id: 'business-strategy',
      name: 'Business Strategy',
      description: 'Strategic planning and business development consulting',
      category: 'strategy',
      icon: Target,
      color: 'from-green-600 to-emerald-700',
      features: [
        'Market Analysis & Research',
        'Competitive Intelligence',
        'Growth Strategy Development',
        'Business Model Innovation'
      ],
      price: 'From $3,500'
    },
    {
      id: 'data-analytics',
      name: 'Data Analytics & BI',
      description: 'Advanced analytics and business intelligence solutions',
      category: 'technical',
      icon: BarChart3,
      color: 'from-orange-600 to-red-700',
      features: [
        'Predictive Analytics',
        'Business Intelligence Dashboards',
        'Data Visualization',
        'Real-time Monitoring'
      ],
      price: 'From $4,500'
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity Consulting',
      description: 'Comprehensive security assessment and implementation',
      category: 'technical',
      icon: Shield,
      color: 'from-red-600 to-pink-700',
      features: [
        'Security Assessment',
        'Compliance Auditing',
        'Incident Response Planning',
        'Security Architecture Design'
      ],
      price: 'From $6,000'
    },
    {
      id: 'digital-transformation',
      name: 'Digital Transformation',
      description: 'End-to-end digital transformation consulting',
      category: 'strategy',
      icon: Globe,
      color: 'from-cyan-600 to-blue-700',
      features: [
        'Digital Strategy Development',
        'Technology Modernization',
        'Process Optimization',
        'Change Management'
      ],
      price: 'From $8,000'
    }
  ]

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

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
              Consultation <span className="text-gaming-magic">Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Comprehensive business solutions powered by AI and strategic expertise
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Expert Consultants Available</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Solutions</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Service Categories */}
      <section className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {serviceCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                  : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`gaming-card bg-gradient-to-br ${service.color} transform hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <service.icon className="w-8 h-8 text-white" />
                <div className="px-2 py-1 rounded text-xs font-semibold bg-white bg-opacity-20 text-white">
                  {service.price}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="magical-button w-full">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="gaming-card max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-6">
              Schedule a free consultation to discuss your business needs and discover how our services can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="magical-button">
                Schedule Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="px-6 py-3 border border-white border-opacity-30 text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                Download Service Guide
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <p className="text-gray-400">
          © 2025 DoganConsult - Professional Business Consultation Services
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Powered by Next.js, React, TypeScript & Strategic Expertise
        </p>
      </footer>
    </div>
  )
}
