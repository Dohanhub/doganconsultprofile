import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, agent, sessionId } = body

    if (!message || !agent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Simulate AI agent responses
    const agentResponses = {
      'consult-professional': {
        name: 'Consult Professional',
        role: 'Business Strategy Expert',
        responses: [
          "Based on your query, I recommend a strategic approach focusing on market analysis and competitive positioning.",
          "From a business perspective, this situation calls for a comprehensive risk assessment and mitigation strategy.",
          "Let me help you develop a strategic roadmap that aligns with your business objectives and market opportunities.",
          "This is an excellent opportunity to leverage AI for competitive advantage. Here's my strategic recommendation...",
          "I suggest we analyze this from multiple angles: market dynamics, competitive landscape, and internal capabilities."
        ]
      },
      'consult-technical': {
        name: 'Consult Technical',
        role: 'Technical Architecture Guide',
        responses: [
          "From a technical standpoint, I recommend implementing a scalable architecture using modern cloud technologies.",
          "This technical challenge can be solved using microservices architecture with proper API design patterns.",
          "Let me suggest a technical solution that prioritizes performance, security, and maintainability.",
          "For this implementation, I recommend using containerization and orchestration for optimal deployment.",
          "The technical architecture should include proper monitoring, logging, and error handling mechanisms."
        ]
      }
    }

    const selectedAgent = agentResponses[agent as keyof typeof agentResponses]
    if (!selectedAgent) {
      return NextResponse.json(
        { error: 'Invalid agent selected' },
        { status: 400 }
      )
    }

    // Generate a contextual response based on the message
    const responseIndex = Math.floor(Math.random() * selectedAgent.responses.length)
    const aiResponse = selectedAgent.responses[responseIndex]

    const chatResponse = {
      id: `msg-${Date.now()}`,
      agent: agent,
      agentName: selectedAgent.name,
      agentRole: selectedAgent.role,
      message: aiResponse,
      timestamp: new Date().toISOString(),
      sessionId: sessionId || `session-${Date.now()}`,
      gamingParadise: {
        mode: 'enabled',
        magicalLevel: 2,
        battleArena: 'active',
        debateMode: 'active'
      }
    }

    return NextResponse.json({
      success: true,
      response: chatResponse,
      gamingStatus: {
        agents: ['consult-professional', 'consult-technical'],
        features: ['Battle Arena', 'Debate Mode', 'Magic System'],
        systemHealth: '100%'
      }
    }, {
      headers: {
        'X-Gaming-Paradise': 'v2.0-enabled',
        'X-Agent': agent,
        'X-Session-ID': sessionId || `session-${Date.now()}`
      }
    })

  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Return available agents and their status
  const agents = [
    {
      id: 'consult-professional',
      name: 'Consult Professional',
      role: 'Business Strategy Expert',
      status: 'online',
      level: 85,
      specialty: 'Strategic planning and business development',
      availability: '24/7'
    },
    {
      id: 'consult-technical',
      name: 'Consult Technical',
      role: 'Technical Architecture Guide',
      status: 'online',
      level: 88,
      specialty: 'Technical solutions and architecture design',
      availability: '24/7'
    }
  ]

  return NextResponse.json({
    agents,
    gamingParadise: {
      mode: 'enabled',
      magicalLevel: 2,
      battleArena: 'active',
      debateMode: 'active',
      magicSystem: 'active'
    },
    systemStatus: {
      health: '100%',
      activeAgents: 2,
      totalFeatures: 4,
      uptime: '99.9%'
    }
  })
}
