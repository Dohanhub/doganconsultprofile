import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json();
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }
    
    // Here you would typically save to a database
    // For now, we'll just log and return success
    console.log('New consultation request:', { name, email, company, message });
    
    // Generate a reference ID (in a real app, this would come from your DB)
    const refId = `CONS-${Date.now()}`;
    
    // In a real implementation, you would:
    // 1. Save to your database
    // 2. Call Calendly/Google Calendar API
    // 3. Handle any errors appropriately
    
    return NextResponse.json({
      ok: true,
      refId,
      bookingUrl: `https://calendly.com/doganconsult/30min?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`,
      message: 'Consultation request received successfully'
    });
    
  } catch (error) {
    console.error('Error processing consultation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
