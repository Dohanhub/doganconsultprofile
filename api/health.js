/**
 * Health Check API Endpoint
 * Provides system status and gaming paradise information
 */

export default function handler(req, res) {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'doganconsult-gaming',
    version: '2.0.0',
    tenant: req.tenant?.brand || 'Dogan Consult',
    gaming: {
      mode: req.gaming?.mode || 'enabled',
      magicalLevel: req.gaming?.magicalLevel || 2,
      battleArena: req.gaming?.battleArena || false,
      debateMode: req.gaming?.debateMode || false,
      deckGenerator: req.gaming?.deckGenerator || false,
      interactiveFeatures: req.gaming?.interactiveFeatures || false,
      crossDomainLinking: req.gaming?.crossDomainLinking || false
    },
    aiAgent: {
      enabled: req.aiAgent?.enabled || false,
      style: req.aiAgent?.style || 'professional',
      agents: req.aiAgent?.agents || []
    },
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      port: process.env.PORT || 3002,
      gamingMode: process.env.GAMING_MODE || 'enabled'
    },
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    features: [
      'Strategy Simulator',
      'Business Chess',
      'ROI Calculator',
      'Interactive Service Demos',
      'Architecture Potions',
      'Code Golf Assessments',
      'Debug Detective Challenges',
      'AI Strategy Simulator',
      'Compliance Assistant',
      'Risk Assessment Games'
    ]
  };

  res.status(200).json(healthData);
}
