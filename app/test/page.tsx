'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle,
  XCircle,
  Clock,
  Bot,
  MessageSquare,
  Calendar,
  Zap,
  Target,
  Sparkles,
  Activity,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'

interface TestResult {
  service: string
  status: 'pass' | 'fail' | 'pending'
  responseTime?: number
  error?: string
  timestamp: string
}

interface AgentStatus {
  id: string
  name: string
  status: 'online' | 'offline' | 'testing'
  responseTime?: number
  lastActivity: string
}

export default function TestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [agentStatus, setAgentStatus] = useState<AgentStatus[]>([])
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [healthData, setHealthData] = useState<any>(null)

  const services = [
    { name: 'Health Check', endpoint: '/api/health' },
    { name: 'Booking API', endpoint: '/api/booking' },
    { name: 'Chat API', endpoint: '/api/chat' }
  ]

  const agents = [
    {
      id: 'consult-professional',
      name: 'Consult Professional',
      role: 'Business Strategy Expert'
    },
    {
      id: 'consult-technical',
      name: 'Consult Technical',
      role: 'Technical Architecture Guide'
    }
  ]

  useEffect(() => {
    runHealthCheck()
  }, [])

  const runHealthCheck = async () => {
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setHealthData(data)
    } catch (error) {
      console.error('Health check failed:', error)
    }
  }

  const runAllTests = async () => {
    setIsRunningTests(true)
    const results: TestResult[] = []

    // Test each service
    for (const service of services) {
      const startTime = Date.now()
      try {
        const response = await fetch(service.endpoint)
        const endTime = Date.now()
        const responseTime = endTime - startTime

        if (response.ok) {
          results.push({
            service: service.name,
            status: 'pass',
            responseTime,
            timestamp: new Date().toISOString()
          })
        } else {
          results.push({
            service: service.name,
            status: 'fail',
            responseTime,
            error: `HTTP ${response.status}`,
            timestamp: new Date().toISOString()
          })
        }
      } catch (error) {
        results.push({
          service: service.name,
          status: 'fail',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        })
      }
    }

    // Test agent responses
    for (const agent of agents) {
      const startTime = Date.now()
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'Test message - please respond with your specialty',
            agent: agent.id,
            sessionId: `test-${Date.now()}`
          }),
        })
        const endTime = Date.now()
        const responseTime = endTime - startTime

        if (response.ok) {
          results.push({
            service: `${agent.name} Response`,
            status: 'pass',
            responseTime,
            timestamp: new Date().toISOString()
          })
        } else {
          results.push({
            service: `${agent.name} Response`,
            status: 'fail',
            responseTime,
            error: `HTTP ${response.status}`,
            timestamp: new Date().toISOString()
          })
        }
      } catch (error) {
        results.push({
          service: `${agent.name} Response`,
          status: 'fail',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        })
      }
    }

    setTestResults(results)
    setIsRunningTests(false)
  }

  const getStatusIcon = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-400" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />
    }
  }

  const getStatusColor = (status: 'pass' | 'fail' | 'pending') => {
    switch (status) {
      case 'pass':
        return 'text-green-400'
      case 'fail':
        return 'text-red-400'
      case 'pending':
        return 'text-yellow-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-background">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              System <span className="text-gaming-magic">Testing</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Verify all agents and services are working properly
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>Testing Environment Active</span>
              </div>
              <div className="flex items-center gap-2 text-purple-400">
                <Sparkles className="w-4 h-4" />
                <span>Gaming Paradise v2.0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="gaming-card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Test Controls
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={runAllTests}
                  disabled={isRunningTests}
                  className="w-full magical-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRunningTests ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Run All Tests
                    </>
                  )}
                </button>

                <button
                  onClick={runHealthCheck}
                  className="w-full px-6 py-3 border border-white border-opacity-30 text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4 inline mr-2" />
                  Refresh Health Check
                </button>
              </div>

              {/* Health Status */}
              {healthData && (
                <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">System Health</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Status:</span>
                      <span className="text-green-400">{healthData.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Version:</span>
                      <span className="text-white">{healthData.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Active Agents:</span>
                      <span className="text-green-400">{healthData.agents?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Avg Response Time:</span>
                      <span className="text-white">{healthData.metrics?.averageResponseTime || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Test Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="gaming-card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                Test Results
              </h2>
              
              <div className="space-y-4">
                {testResults.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <p className="text-gray-300">No tests run yet. Click "Run All Tests" to start.</p>
                  </div>
                ) : (
                  testResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(result.status)}
                        <div>
                          <h3 className="font-semibold text-white">{result.service}</h3>
                          {result.error && (
                            <p className="text-sm text-red-400">{result.error}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {result.responseTime && (
                          <p className="text-sm text-gray-300">{result.responseTime}ms</p>
                        )}
                        <p className={`text-xs ${getStatusColor(result.status)}`}>
                          {result.status.toUpperCase()}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Summary */}
              {testResults.length > 0 && (
                <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-3">Test Summary</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">
                        {testResults.filter(r => r.status === 'pass').length}
                      </div>
                      <div className="text-sm text-gray-300">Passed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-400">
                        {testResults.filter(r => r.status === 'fail').length}
                      </div>
                      <div className="text-sm text-gray-300">Failed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {testResults.length}
                      </div>
                      <div className="text-sm text-gray-300">Total</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Agent Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <div className="gaming-card">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Bot className="w-6 h-6" />
              Agent Status
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="p-6 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                    </div>
                    <span className="text-sm text-green-400">Online</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{agent.role}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Level:</span>
                      <span className="text-white">85+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Availability:</span>
                      <span className="text-green-400">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Response Time:</span>
                      <span className="text-white">~30ms</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <p className="text-gray-400">
          © 2025 DoganConsult - System Testing & Monitoring
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Powered by Next.js, React, TypeScript & Gaming Paradise v2.0
        </p>
      </footer>
    </div>
  )
}
