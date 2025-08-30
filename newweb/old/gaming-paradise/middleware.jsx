/**
 * Enhanced Middleware for Gaming Paradise Multi-Domain System
 * Handles tenant detection, gaming features, and magical routing
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Gaming Paradise Tenant Configuration
const GAMING_TENANTS = {
  'doganahmet.com': {
    name: 'DoganAhmet Gaming Portal',
    theme: 'burnt-orange',
    primary: '#E86B2A',
    magicalLevel: 5,
    gamingFeatures: ['portfolio-adventure', 'coding-challenges', 'fortune-telling'],
    agents: ['ahmet-personal', 'ahmet-magical'],
    specialPowers: ['code-spells', 'ascii-art', 'tech-quizzes']
  },
  'doganconsult.com': {
    name: 'DoganConsult Strategy Arena', 
    theme: 'navy-blue',
    primary: '#0F2C4C',
    magicalLevel: 2,
    gamingFeatures: ['strategy-simulator', 'business-chess', 'roi-calculator'],
    agents: ['consult-professional', 'consult-technical'],
    specialPowers: ['architecture-potions', 'code-golf', 'debug-detective']
  },
  'doganhub.com': {
    name: 'DoganHub Command Center',
    theme: 'tech-green', 
    primary: '#0C8F5C',
    magicalLevel: 3,
    gamingFeatures: ['treasure-hunt', 'skill-matcher', 'discovery-roulette'],
    agents: ['hub-navigator', 'defender', 'refuter', 'arbiter'],
    specialPowers: ['explorer-badges', 'debate-arena', 'wisdom-council']
  },
  'dogan-ai.com': {
    name: 'DoganAI Playground',
    theme: 'electric-blue',
    primary: '#1E63E9', 
    magicalLevel: 4,
    gamingFeatures: ['ai-vs-human', 'prompt-games', 'creative-roulette'],
    agents: ['ai-demo', 'ai-creative'],
    specialPowers: ['live-demos', 'idea-fusion', 'future-predictor']
  }
};

// Default tenant for unknown domains
const DEFAULT_TENANT = 'doganhub.com';

function detectTenant(hostname: string) {
  // Remove www. prefix and port numbers for development
  const cleanHostname = hostname
    .replace(/^www\./, '')
    .replace(/:\d+$/, '')
    .toLowerCase();

  // Direct match
  if (GAMING_TENANTS[cleanHostname]) {
    return { key: cleanHostname, config: GAMING_TENANTS[cleanHostname] };
  }

  // Development localhost mapping
  if (cleanHostname === 'localhost' || cleanHostname.includes('127.0.0.1')) {
    // Use environment variable or default
    const envDomain = process.env.TENANT_DOMAIN || DEFAULT_TENANT;
    if (GAMING_TENANTS[envDomain]) {
      return { key: envDomain, config: GAMING_TENANTS[envDomain] };
    }
  }

  // Azure webapp hostname mapping
  if (cleanHostname.includes('azurewebsites.net')) {
    for (const [domain, config] of Object.entries(GAMING_TENANTS)) {
      const expectedHostname = `${domain.replace('.', '-')}-gaming.azurewebsites.net`;
      if (cleanHostname === expectedHostname) {
        return { key: domain, config };
      }
    }
  }

  // Partial domain match for development
  for (const [domain, config] of Object.entries(GAMING_TENANTS)) {
    const domainPart = domain.replace('.com', '');
    if (cleanHostname.includes(domainPart)) {
      return { key: domain, config };
    }
  }

  // Default tenant
  return { key: DEFAULT_TENANT, config: GAMING_TENANTS[DEFAULT_TENANT] };
}

function generateGamingHeaders(tenant: any, request: NextRequest) {
  const headers = new Headers();
  
  // Gaming Paradise headers
  headers.set('X-Gaming-Paradise', 'v2.0-active');
  headers.set('X-Tenant-Domain', tenant.key);
  headers.set('X-Tenant-Name', tenant.config.name);
  headers.set('X-Gaming-Theme', tenant.config.theme);
  headers.set('X-Magical-Level', tenant.config.magicalLevel.toString());
  headers.set('X-Gaming-Features', tenant.config.gamingFeatures.join(','));
  headers.set('X-Available-Agents', tenant.config.agents.join(','));
  headers.set('X-Special-Powers', tenant.config.specialPowers.join(','));
  
  // CORS headers for cross-domain gaming
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, X-Gaming-Mode, X-Magical-Level');
  
  // Performance headers
  headers.set('X-DNS-Prefetch-Control', 'on');
  
  return headers;
}

function handleGamingAPIRoutes(request: NextRequest, tenant: any) {
  const url = request.nextUrl.clone();
  
  // Gaming API routes enhancement
  if (url.pathname.startsWith('/api/')) {
    // Add tenant context to API calls
    url.searchParams.set('tenant', tenant.key);
    url.searchParams.set('gamingMode', 'enabled');
    url.searchParams.set('magicalLevel', tenant.config.magicalLevel.toString());
    
    // Specific gaming route handling
    if (url.pathname.startsWith('/api/agents/')) {
      // Add available agents filter
      url.searchParams.set('availableAgents', tenant.config.agents.join(','));
    }
    
    if (url.pathname.startsWith('/api/gaming/')) {
      // Add gaming features context
      url.searchParams.set('features', tenant.config.gamingFeatures.join(','));
      url.searchParams.set('specialPowers', tenant.config.specialPowers.join(','));
    }
    
    return NextResponse.rewrite(url);
  }
  
  return null;
}

function handleMagicalRedirects(request: NextRequest, tenant: any) {
  const url = request.nextUrl.clone();
  
  // Magic portal redirects
  if (url.pathname === '/magic' || url.pathname === '/magical') {
    if (tenant.config.magicalLevel > 0) {
      url.pathname = '/';
      url.searchParams.set('tab', 'chat');
      url.searchParams.set('magical', 'true');
      return NextResponse.redirect(url);
    }
  }
  
  // Gaming portal redirects  
  if (url.pathname === '/gaming' || url.pathname === '/games') {
    url.pathname = '/';
    url.searchParams.set('gaming', 'true');
    return NextResponse.redirect(url);
  }
  
  // Battle arena direct access
  if (url.pathname === '/battle' || url.pathname === '/arena') {
    url.pathname = '/';
    url.searchParams.set('tab', 'battle');
    return NextResponse.redirect(url);
  }
  
  // Debate chamber direct access
  if (url.pathname === '/debate' || url.pathname === '/philosophy') {
    url.pathname = '/';
    url.searchParams.set('tab', 'debate');
    return NextResponse.redirect(url);
  }
  
  // Deck generator direct access
  if (url.pathname === '/deck' || url.pathname === '/presentation') {
    url.pathname = '/';
    url.searchParams.set('tab', 'deck');
    return NextResponse.redirect(url);
  }
  
  return null;
}

function handleCrossDomainNavigation(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Cross-domain navigation handling
  if (url.pathname.startsWith('/goto/')) {
    const targetDomain = url.pathname.replace('/goto/', '');
    
    if (GAMING_TENANTS[targetDomain]) {
      // Redirect to target domain
      const protocol = url.protocol;
      const targetUrl = `${protocol}//${targetDomain}${url.search}`;
      return NextResponse.redirect(targetUrl);
    }
  }
  
  return null;
}

function injectGamingMetadata(response: NextResponse, tenant: any) {
  // Inject gaming metadata into HTML responses
  if (response.headers.get('content-type')?.includes('text/html')) {
    const gamingMeta = {
      tenant: tenant.key,
      name: tenant.config.name,
      theme: tenant.config.theme,
      magicalLevel: tenant.config.magicalLevel,
      gamingFeatures: tenant.config.gamingFeatures,
      agents: tenant.config.agents,
      specialPowers: tenant.config.specialPowers
    };
    
    // Set gaming metadata headers for client-side access
    response.headers.set('X-Gaming-Metadata', JSON.stringify(gamingMeta));
  }
  
  return response;
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || 'localhost';
  const tenant = detectTenant(hostname);
  
  // Handle magical redirects first
  const magicalRedirect = handleMagicalRedirects(request, tenant);
  if (magicalRedirect) return magicalRedirect;
  
  // Handle cross-domain navigation
  const crossDomainRedirect = handleCrossDomainNavigation(request);
  if (crossDomainRedirect) return crossDomainRedirect;
  
  // Handle gaming API routes
  const apiRewrite = handleGamingAPIRoutes(request, tenant);
  if (apiRewrite) return apiRewrite;
  
  // Generate response with gaming headers
  const response = NextResponse.next();
  
  // Add gaming headers
  const gamingHeaders = generateGamingHeaders(tenant, request);
  gamingHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });
  
  // Add tenant-specific CSS variables
  const cssVars = `
    --gaming-primary: ${tenant.config.primary};
    --gaming-theme: '${tenant.config.theme}';
    --magical-level: ${tenant.config.magicalLevel};
  `;
  response.headers.set('X-Gaming-CSS-Vars', cssVars);
  
  // Inject gaming metadata
  const enhancedResponse = injectGamingMetadata(response, tenant);
  
  // Add performance headers for gaming
  enhancedResponse.headers.set('X-Gaming-Performance', 'optimized');
  enhancedResponse.headers.set('X-Gaming-Cache-Control', 'public, max-age=300');
  
  return enhancedResponse;
}

// Configure middleware to run on all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};