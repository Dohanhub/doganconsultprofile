'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar,
  Clock,
  User,
  Mail,
  Building,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Bot,
  Target
} from 'lucide-react'

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
    preferredDate: '',
    preferredTime: ''
  })

  const [availableSlots, setAvailableSlots] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingId, setBookingId] = useState('')

  const services = [
    'AI Strategy Consulting',
    'AI Implementation',
    'Business Strategy',
    'Data Analytics & BI',
    'Cybersecurity Consulting',
    'Digital Transformation',
    'Free Consultation'
  ]

  useEffect(() => {
    // Fetch available time slots
    fetchAvailableSlots()
  }, [])

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch('/api/booking')
      const data = await response.json()
      setAvailableSlots(data.availableSlots)
    } catch (error) {
      console.error('Error fetching slots:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const bookingData = {
        ...formData,
        preferredDate: selectedDate,
        preferredTime: selectedTime
      }

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      const result = await response.json()

      if (result.success) {
        setBookingId(result.bookingId)
        setBookingSuccess(true)
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: '',
          preferredDate: '',
          preferredTime: ''
        })
        setSelectedDate('')
        setSelectedTime('')
      } else {
        alert('Booking failed. Please try again.')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Booking failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const getAvailableTimesForDate = (date: string): string[] => {
    const slot = availableSlots.find(s => s.date === date)
    return slot ? slot.times : []
  }

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-background">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="gaming-card">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">
                Booking Confirmed!
              </h1>
              <p className="text-gray-300 mb-6">
                Your consultation has been successfully booked. We will contact you within 24 hours to confirm your appointment.
              </p>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Booking Details</h3>
                <div className="text-left space-y-2 text-gray-300">
                  <p><strong>Booking ID:</strong> {bookingId}</p>
                  <p><strong>Service:</strong> {formData.service}</p>
                  <p><strong>Date:</strong> {selectedDate || 'To be scheduled'}</p>
                  <p><strong>Time:</strong> {selectedTime || 'To be scheduled'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="magical-button"
                >
                  Book Another Consultation
                </button>
                <a
                  href="/"
                  className="px-6 py-3 border border-white border-opacity-30 text-white rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                >
                  Return Home
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
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
              Book Your <span className="text-gaming-magic">Consultation</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Schedule a consultation with our AI experts and transform your business
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

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="gaming-card">
              <h2 className="text-3xl font-bold text-white mb-8">Schedule Consultation</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-gray-800">
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your project or specific needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="magical-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Booking...' : 'Book Consultation'} <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Date and Time Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="gaming-card">
              <h2 className="text-3xl font-bold text-white mb-8">Select Date & Time</h2>
              
              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Available Dates
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.date}
                      onClick={() => setSelectedDate(slot.date)}
                      className={`p-3 rounded-lg border transition-all duration-300 ${
                        selectedDate === slot.date
                          ? 'border-gaming-magic bg-gaming-magic bg-opacity-20 text-white'
                          : 'border-white border-opacity-20 text-gray-300 hover:border-gaming-magic hover:text-white'
                      }`}
                    >
                      {new Date(slot.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Available Times
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {getAvailableTimesForDate(selectedDate).map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          selectedTime === time
                            ? 'border-gaming-magic bg-gaming-magic bg-opacity-20 text-white'
                            : 'border-white border-opacity-20 text-gray-300 hover:border-gaming-magic hover:text-white'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Agents Status */}
              <div className="bg-white bg-opacity-5 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Agents Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Consult Professional</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Consult Technical</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <p className="text-gray-400">
          © 2025 DoganConsult - Professional Business Consultation Services
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Powered by Next.js, React, TypeScript & Gaming Paradise v2.0
        </p>
      </footer>
    </div>
  )
}
