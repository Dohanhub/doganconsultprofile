'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users,
  MessageSquare,
  Calendar,
  Clock,
  TrendingUp,
  Activity,
  Bot,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Target,
  Zap,
  Sparkles,
  RefreshCw
} from 'lucide-react'

interface DashboardMetrics {
  totalBookings: number
  totalChatSessions: number
  activeAgents: number
  averageResponseTime: string
  customerSatisfaction: number
  systemUptime: string
}

interface RecentActivity {
  id: string
  type: 'booking' | 'chat' | 'agent_response'
  description: string
  timestamp: string
  status: 'success' | 'pending' | 'error'
}

export default function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalBookings: 0,
    totalChatSessions: 0,
    activeAgents: 2,
    averageResponseTime: '35ms',
    customerSatisfaction: 98,
    systemUptime: '99.9%'
  })

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      // Simulate loading dashboard data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate recent activity
      const mockActivity: RecentActivity[] = [
        {
          id: '1',
          type: 'booking',
          description: 'New consultation booking: AI Strategy Consulting',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          status: 'success'
        },
        {
          id: '2',
          type: 'chat',
          description: 'Chat session started with Consult Professional',
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          status: 'success'
        },
        {
          id: '3',
          type: 'agent_response',
          description: 'Consult Technical responded to technical query',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          status: 'success'
        },
        {
          id: '4',
          type: 'booking',
          description: 'Booking confirmed: Business Strategy session',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          status: 'success'
        }
      ]

      setRecentActivity(mockActivity)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4" />
      case 'chat':
        return <MessageSquare className="w-4 h-4" />
      case 'agent_response':
        return <Bot className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-400'
      case 'pending':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
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
              Customer Service <span className="text-gaming-magic">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Monitor all customer service and consultation activities in real-time
            </p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span>All Systems Operational</span>
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
        {/* Metrics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <div className="gaming-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Total Bookings</h3>
                  <p className="text-sm text-gray-400">Consultation requests</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{metrics.totalBookings}</div>
                <div className="text-sm text-green-400">+12% this week</div>
              </div>
            </div>
          </div>

          <div className="gaming-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Chat Sessions</h3>
                  <p className="text-sm text-gray-400">Live consultations</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{metrics.totalChatSessions}</div>
                <div className="text-sm text-green-400">+8% this week</div>
              </div>
            </div>
          </div>

          <div className="gaming-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Bot className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Active Agents</h3>
                  <p className="text-sm text-gray-400">AI consultants</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{metrics.activeAgents}</div>
                <div className="text-sm text-green-400">100% online</div>
              </div>
            </div>
          </div>

          <div className="gaming-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-yellow-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Avg Response</h3>
                  <p className="text-sm text-gray-400">Response time</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{metrics.averageResponseTime}</div>
                <div className="text-sm text-green-400">Fast</div>
              </div>
            </div>
          </div>

          <div className="gaming-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Satisfaction</h3>
                  <p className="text-sm text-gray-400">Customer rating</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{metrics.customerSatisfaction}%</div>
                <div className="text-sm text-green-400">Excellent</div>
              </div>
            </div>
          </div>

          <div className="gaming-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">System Uptime</h3>
                  <p className="text-sm text-gray-400">Service availability</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">{metrics.systemUptime}</div>
                <div className="text-sm text-green-400">Stable</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agent Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="gaming-card">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Bot className="w-6 h-6" />
                Agent Performance
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-400" />
                    <div>
                      <h3 className="font-semibold text-white">Consult Professional</h3>
                      <p className="text-sm text-gray-400">Business Strategy Expert</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">Level 85</div>
                    <div className="text-sm text-green-400">Online</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-green-400" />
                    <div>
                      <h3 className="font-semibold text-white">Consult Technical</h3>
                      <p className="text-sm text-gray-400">Technical Architecture Guide</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">Level 88</div>
                    <div className="text-sm text-green-400">Online</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Performance Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Responses:</span>
                    <span className="text-white">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Avg Response Time:</span>
                    <span className="text-white">28ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Success Rate:</span>
                    <span className="text-green-400">99.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Customer Rating:</span>
                    <span className="text-green-400">4.9/5.0</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="gaming-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  Recent Activity
                </h2>
                <button
                  onClick={loadDashboardData}
                  disabled={isLoading}
                  className="p-2 text-white hover:text-gaming-magic transition-colors duration-300"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-white bg-opacity-5 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.description}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusIcon(activity.status)}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white bg-opacity-5 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors duration-300">
                    View All Bookings
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors duration-300">
                    Chat History
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors duration-300">
                    Agent Reports
                  </button>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors duration-300">
                    System Status
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <p className="text-gray-400">
          © 2025 DoganConsult - Customer Service Dashboard
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Powered by Next.js, React, TypeScript & Gaming Paradise v2.0
        </p>
      </footer>
    </div>
  )
}
