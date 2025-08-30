/**
 * Enhanced Next.js Configuration for Gaming Paradise
 * Multi-domain gaming agents with enhanced features
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gaming Paradise Configuration
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tanstack/react-query'],
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },

  // Enhanced for gaming features
  images: {
    domains: [
      'doganahmet.com',
      'doganconsult.com', 
      'doganhub.com',
      'dogan-ai.com',
      'localhost',
      '*.azurewebsites.net'
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true, // For gaming icons and magical elements
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  // Gaming Paradise Environment Variables
  env: {
    GAMING_MODE: process.env.GAMING_MODE || 'enabled',
    MAGICAL_LEVEL: process.env.MAGICAL_LEVEL || '3',
    BATTLE_ARENA: process.env.BATTLE_ARENA || 'enabled',
    DEBATE_MODE: process.env.DEBATE_MODE || 'enabled',
    DECK_GENERATOR: process.env.DECK_GENERATOR || 'enabled',
    INTERACTIVE_FEATURES: process.env.INTERACTIVE_FEATURES || 'enabled',
    CROSS_DOMAIN_LINKING: process.env.CROSS_DOMAIN_LINKING || 'enabled',
    TENANT_DOMAIN: process.env.TENANT_DOMAIN,
    AGENTS: process.env.AGENTS,
    THEME: process.env.THEME,
    SPECIAL_FEATURES: process.env.SPECIAL_FEATURES
  },

  // Enhanced rewrites for gaming routes
  async rewrites() {
    return [
      // Gaming API routes
      {
        source: '/api/gaming/:path*',
        destination: '/api/agents/:path*'
      },
      {
        source: '/api/battle/:path*', 
        destination: '/api/gaming/battle/:path*'
      },
      {
        source: '/api/debate/:path*',
        destination: '/api/gaming/debate/:path*'
      },
      {
        source: '/api/deck/:path*',
        destination: '/api/gaming/deck/:path*'
      },
      {
        source: '/api/magic/:path*',
        destination: '/api/gaming/magic/:path*'
      },
      
      // Domain-specific gaming routes
      {
        source: '/gaming/:domain/:feature*',
        destination: '/api/gaming/:feature*?domain=:domain'
      },
      
      // Legacy compatibility
      {
        source: '/agents/:path*',
        destination: '/api/agents/:path*'
      }
    ];
  },

  // Enhanced headers for gaming features
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Gaming Paradise Security Headers
          {
            key: 'X-Gaming-Paradise',
            value: 'v2.0-enabled'
          },
          {
            key: 'X-Magical-Level',
            value: process.env.MAGICAL_LEVEL || '3'
          },
          {
            key: 'X-Gaming-Features',
            value: 'battle-arena,debate-mode,deck-generator,interactive-chat'
          },
          
          // CORS for cross-domain gaming
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' 
              ? 'https://*.doganahmet.com,https://*.doganconsult.com,https://*.doganhub.com,https://*.dogan-ai.com'
              : '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Gaming-Mode, X-Magical-Level'
          },
          
          // Performance headers for gaming
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      
      // API-specific headers
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          },
          {
            key: 'X-API-Gaming-Enabled',
            value: 'true'
          }
        ]
      },

      // Gaming assets headers
      {
        source: '/gaming/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'X-Gaming-Asset',
            value: 'true'
          }
        ]
      }
    ];
  },

  // Enhanced redirects for gaming domains
  async redirects() {
    const redirects = [];

    // Gaming feature redirects
    redirects.push(
      {
        source: '/battle',
        destination: '/?tab=battle',
        permanent: false
      },
      {
        source: '/debate',
        destination: '/?tab=debate', 
        permanent: false
      },
      {
        source: '/deck',
        destination: '/?tab=deck',
        permanent: false
      },
      {
        source: '/chat',
        destination: '/?tab=chat',
        permanent: false
      }
    );

    // Domain-specific redirects based on environment
    if (process.env.TENANT_DOMAIN) {
      const domain = process.env.TENANT_DOMAIN;
      
      // Redirect old paths to new gaming structure
      redirects.push(
        {
          source: '/old-chat',
          destination: '/?tab=chat',
          permanent: true
        },
        {
          source: '/agents',
          destination: '/?tab=chat',
          permanent: true
        }
      );
    }

    return redirects;
  },

  // Enhanced webpack config for gaming features
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Gaming Paradise webpack optimizations
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Optimize for gaming performance
    if (!dev) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          gaming: {
            name: 'gaming',
            chunks: 'all',
            test: /[\\/]components[\\/](MultiAgentChat|ChatBattleArena|RefuteMode|DeckGenerator)/,
            priority: 30,
            reuseExistingChunk: true
          },
          agents: {
            name: 'agents',
            chunks: 'all',
            test: /[\\/]lib[\\/]agents/,
            priority: 25,
            reuseExistingChunk: true
          }
        }
      };
    }

    // Gaming feature flags
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.GAMING_PARADISE': JSON.stringify(true),
        'process.env.GAMING_VERSION': JSON.stringify('2.0'),
        'process.env.BUILD_TIME': JSON.stringify(new Date().toISOString()),
        'process.env.BUILD_ID': JSON.stringify(buildId)
      })
    );

    return config;
  },

  // Enhanced output configuration
  output: 'standalone',
  
  // Gaming Paradise build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  // Enhanced ESLint for gaming code
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
    dirs: ['app', 'components', 'lib', 'shared']
  },

  // TypeScript configuration for gaming
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },

  // Gaming Paradise PWA configuration
  async generateBuildId() {
    // Include gaming features in build ID
    const gamingFeatures = [
      process.env.GAMING_MODE,
      process.env.MAGICAL_LEVEL,
      process.env.BATTLE_ARENA,
      process.env.DEBATE_MODE
    ].filter(Boolean).join('-');
    
    return `gaming-paradise-${gamingFeatures}-${Date.now()}`;
  },

  // Runtime configuration for gaming
  publicRuntimeConfig: {
    gamingMode: process.env.GAMING_MODE,
    magicalLevel: process.env.MAGICAL_LEVEL,
    battleArena: process.env.BATTLE_ARENA,
    debateMode: process.env.DEBATE_MODE,
    deckGenerator: process.env.DECK_GENERATOR,
    interactiveFeatures: process.env.INTERACTIVE_FEATURES,
    crossDomainLinking: process.env.CROSS_DOMAIN_LINKING
  },

  // Server runtime configuration
  serverRuntimeConfig: {
    tenantDomain: process.env.TENANT_DOMAIN,
    agents: process.env.AGENTS,
    theme: process.env.THEME,
    specialFeatures: process.env.SPECIAL_FEATURES
  },

  // Enhanced logging for gaming
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development'
    }
  },

  // Gaming Paradise metadata
  poweredByHeader: false,
  generateEtags: true,
  compress: true,
  
  // Enhanced dev indicators
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right'
  }
};

// Gaming environment validation
if (process.env.GAMING_MODE === 'enabled') {
  console.log('?? Gaming Paradise Mode: ENABLED');
  console.log(`? Magical Level: ${process.env.MAGICAL_LEVEL || 3}/5`);
  console.log(`?? Gaming Features: ${Object.entries(nextConfig.env)
    .filter(([key, value]) => key.includes('MODE') || key.includes('ARENA') || key.includes('GENERATOR'))
    .filter(([_, value]) => value === 'enabled')
    .map(([key]) => key)
    .join(', ')}`);
}

module.exports = nextConfig;