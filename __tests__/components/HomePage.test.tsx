import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('HomePage Component', () => {
  it('should render gaming paradise title', () => {
    render(<Home />)
    
    expect(screen.getByText('DoganConsult')).toBeInTheDocument()
    expect(screen.getByText('Gaming Paradise Strategy Arena')).toBeInTheDocument()
    expect(screen.getByText('Professional Business Consultation with AI Agents')).toBeInTheDocument()
  })
  
  it('should display gaming paradise status', () => {
    render(<Home />)
    
    expect(screen.getByText('Gaming Paradise v2.0 Active')).toBeInTheDocument()
    expect(screen.getByText('Magic Level 2')).toBeInTheDocument()
  })
  
  it('should render gaming features', () => {
    render(<Home />)
    
    expect(screen.getByText('Battle Arena')).toBeInTheDocument()
    expect(screen.getByText('Debate Mode')).toBeInTheDocument()
    expect(screen.getByText('Magic System')).toBeInTheDocument()
    expect(screen.getByText('AI Agents')).toBeInTheDocument()
  })
  
  it('should display AI agents section', () => {
    render(<Home />)
    
    expect(screen.getByText('AI Agents')).toBeInTheDocument()
    expect(screen.getByText('Consult Professional')).toBeInTheDocument()
    expect(screen.getByText('Consult Technical')).toBeInTheDocument()
  })
  
  it('should show agent details', () => {
    render(<Home />)
    
    expect(screen.getByText('Business Strategy Expert')).toBeInTheDocument()
    expect(screen.getByText('Technical Architecture Guide')).toBeInTheDocument()
    expect(screen.getByText('Lv.85')).toBeInTheDocument()
    expect(screen.getByText('Lv.88')).toBeInTheDocument()
  })
  
  it('should display gaming paradise status dashboard', () => {
    render(<Home />)
    
    expect(screen.getByText('Gaming Paradise Status')).toBeInTheDocument()
    expect(screen.getByText('Active Agents')).toBeInTheDocument()
    expect(screen.getByText('Gaming Features')).toBeInTheDocument()
    expect(screen.getByText('Magic Level')).toBeInTheDocument()
    expect(screen.getByText('System Health')).toBeInTheDocument()
  })
  
  it('should show status numbers', () => {
    render(<Home />)
    
    expect(screen.getByText('2')).toBeInTheDocument() // Active Agents
    expect(screen.getByText('4')).toBeInTheDocument() // Gaming Features
    expect(screen.getByText('100%')).toBeInTheDocument() // System Health
  })
  
  it('should render footer with gaming paradise info', () => {
    render(<Home />)
    
    expect(screen.getByText(/© 2025 DoganConsult/)).toBeInTheDocument()
    expect(screen.getByText(/Powered by Next.js, React, TypeScript & Gaming Paradise v2.0/)).toBeInTheDocument()
  })
  
  it('should have proper gaming paradise styling classes', () => {
    const { container } = render(<Home />)
    
    // Check for gaming paradise specific classes
    expect(container.querySelector('.gaming-card')).toBeInTheDocument()
    expect(container.querySelector('.ai-agent')).toBeInTheDocument()
    expect(container.querySelector('.magical-button')).toBeInTheDocument()
  })
})
