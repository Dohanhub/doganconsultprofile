/**
 * DoganConsult Middleware for Gaming Paradise
 * Multi-tenant configuration and AI agent setup
 */

import { getTenantByHostname } from '../../config/tenants.js';

/**
 * Express middleware to handle multi-tenant configuration
 */
export function tenantMiddleware(req, res, next) {
  // Get hostname from request
  const hostname = req.headers.host || '';
  
  // Get tenant configuration for this hostname
  const tenant = getTenantByHostname(hostname);
  
  // Attach tenant info to request object for use in routes
  req.tenant = tenant;
  
  // Add tenant-specific response headers
  res.setHeader('X-Tenant', tenant.brand);
  res.setHeader('X-Gaming-Paradise', 'v2.0-enabled');
  res.setHeader('X-Magical-Level', process.env.MAGICAL_LEVEL || '2');
  
  // Add tenant CSS variables to res.locals for template rendering
  if (!res.locals) res.locals = {};
  res.locals.tenant = tenant;
  res.locals.tenantCss = `
    :root {
      --primary: ${tenant.primary};
      --background: ${tenant.background};
      --brand: "${tenant.brand}";
    }
  `;
  
  // Add brand-specific favicon
  res.locals.favicon = tenant.favicon || '/brand/favicon.svg';
  
  // Add brand-specific title
  res.locals.title = tenant.manifestName || tenant.brand;
  
  next();
}

/**
 * Apply AI agent configuration based on tenant settings
 */
export function aiAgentMiddleware(req, res, next) {
  const tenant = req.tenant;
  
  // Skip if tenant doesn't have AI agent enabled
  if (!tenant || !tenant.enableAiAgent) {
    return next();
  }
  
  // Add AI agent configuration to request
  req.aiAgent = {
    enabled: true,
    style: tenant.agentStyle || 'professional',
    icon: tenant.agentIcon || '/brand/favicon.svg',
    greeting: `Welcome to ${tenant.brand}! How can I help you today?`,
    agents: process.env.AGENTS?.split(',') || ['consult-professional', 'consult-technical']
  };
  
  // Make agent config available to templates
  if (!res.locals) res.locals = {};
  res.locals.aiAgent = req.aiAgent;
  
  next();
}

/**
 * Gaming features middleware
 */
export function gamingMiddleware(req, res, next) {
  // Add gaming configuration
  req.gaming = {
    mode: process.env.GAMING_MODE || 'enabled',
    magicalLevel: parseInt(process.env.MAGICAL_LEVEL) || 2,
    battleArena: process.env.BATTLE_ARENA === 'enabled',
    debateMode: process.env.DEBATE_MODE === 'enabled',
    deckGenerator: process.env.DECK_GENERATOR === 'enabled',
    interactiveFeatures: process.env.INTERACTIVE_FEATURES === 'enabled',
    crossDomainLinking: process.env.CROSS_DOMAIN_LINKING === 'enabled',
    specialFeatures: process.env.SPECIAL_FEATURES?.split(',') || []
  };
  
  // Make gaming config available to templates
  if (!res.locals) res.locals = {};
  res.locals.gaming = req.gaming;
  
  next();
}

/**
 * Express middleware setup function
 * @param {Express} app - Express app instance
 */
export function setupMultiTenancy(app) {
  // Apply tenant middleware to all requests
  app.use(tenantMiddleware);
  
  // Apply AI agent middleware to all requests
  app.use(aiAgentMiddleware);
  
  // Apply gaming middleware to all requests
  app.use(gamingMiddleware);
  
  // Add tenant information to all JSON responses
  app.use((req, res, next) => {
    const originalJson = res.json;
    
    res.json = function(body) {
      // Only add tenant info to API responses that return objects
      if (body && typeof body === 'object' && !Array.isArray(body)) {
        body._tenant = req.tenant.brand;
        body._gaming = req.gaming;
      }
      
      return originalJson.call(this, body);
    };
    
    next();
  });
}
