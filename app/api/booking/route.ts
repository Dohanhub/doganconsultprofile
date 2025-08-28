import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, message, preferredDate, preferredTime } = body

    // Validate required fields
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Simulate booking processing
    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    const booking = {
      id: bookingId,
      name,
      email,
      company: company || 'Not specified',
      service,
      message: message || 'No additional message',
      preferredDate: preferredDate || 'To be scheduled',
      preferredTime: preferredTime || 'To be scheduled',
      status: 'pending',
      createdAt: new Date().toISOString(),
      gamingParadise: {
        mode: 'enabled',
        magicalLevel: 2,
        agents: ['consult-professional', 'consult-technical']
      }
    }

    // In a real application, you would save this to a database
    console.log('New booking received:', booking)

    // Send confirmation email (simulated)
    const confirmationEmail = {
      to: email,
      subject: `Booking Confirmation - ${service}`,
      body: `Thank you for booking a consultation with DoganConsult!
      
Booking Details:
- Booking ID: ${bookingId}
- Service: ${service}
- Date: ${preferredDate || 'To be scheduled'}
- Time: ${preferredTime || 'To be scheduled'}

We will contact you within 24 hours to confirm your appointment.

Gaming Paradise Status: Active
AI Agents: Online and Ready

Best regards,
DoganConsult Team`
    }

    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Booking submitted successfully. We will contact you within 24 hours.',
      confirmationEmail
    }, {
      headers: {
        'X-Gaming-Paradise': 'v2.0-enabled',
        'X-Booking-ID': bookingId,
        'X-Agents': 'consult-professional,consult-technical'
      }
    })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to process booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Return available time slots
  const availableSlots = [
    { date: '2025-01-15', times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    { date: '2025-01-16', times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    { date: '2025-01-17', times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    { date: '2025-01-20', times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
    { date: '2025-01-21', times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] }
  ]

  return NextResponse.json({
    availableSlots,
    gamingParadise: {
      mode: 'enabled',
      magicalLevel: 2,
      agents: ['consult-professional', 'consult-technical']
    }
  })
}
