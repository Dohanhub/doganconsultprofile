import { NextRequest } from 'next/server'
import { GET } from '@/app/api/health/route'

describe('Health API', () => {
  it('should return healthy status with gaming paradise info', async () => {
    const mockRequest = new NextRequest('http://localhost:3002/api/health')
    
    const response = await GET(mockRequest)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.status).toBe('healthy')
    expect(data.service).toBe('doganconsult-gaming')
    expect(data.version).toBe('2.0.0')
    expect(data.tenant).toBe('Dogan Consult')
    
    // Check gaming paradise features
    expect(data.gaming.mode).toBe('enabled')
    expect(data.gaming.magicalLevel).toBe(2)
    expect(data.gaming.battleArena).toBe(true)
    expect(data.gaming.debateMode).toBe(true)
    
    // Check AI agents
    expect(data.aiAgent.enabled).toBe(true)
    expect(data.aiAgent.style).toBe('professional')
    expect(data.aiAgent.agents).toContain('consult-professional')
    expect(data.aiAgent.agents).toContain('consult-technical')
    
    // Check environment
    expect(data.environment.nodeEnv).toBe('test')
    expect(data.environment.port).toBe(3002)
    expect(data.environment.gamingMode).toBe('enabled')
    
    // Check features list
    expect(data.features).toContain('Strategy Simulator')
    expect(data.features).toContain('Business Chess')
    expect(data.features).toContain('ROI Calculator')
    expect(data.features).toContain('Architecture Potions')
  })
  
  it('should include gaming paradise headers', async () => {
    const mockRequest = new NextRequest('http://localhost:3002/api/health')
    
    const response = await GET(mockRequest)
    
    expect(response.headers.get('X-Gaming-Paradise')).toBe('v2.0-enabled')
    expect(response.headers.get('X-Magical-Level')).toBe('2')
    expect(response.headers.get('X-Tenant-Domain')).toBe('doganconsult.com')
    expect(response.headers.get('X-Agents')).toBe('consult-professional,consult-technical')
  })
  
  it('should include timestamp in response', async () => {
    const mockRequest = new NextRequest('http://localhost:3002/api/health')
    
    const response = await GET(mockRequest)
    const data = await response.json()
    
    expect(data.timestamp).toBeDefined()
    expect(new Date(data.timestamp)).toBeInstanceOf(Date)
  })
})
