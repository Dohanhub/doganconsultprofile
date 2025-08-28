/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Gaming Paradise Configuration
  experimental: {
    serverComponentsExternalPackages: ['@tanstack/react-query'],
    optimizeCss: false,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },

  // Enhanced for gaming features
  images: {
    domains: [
      'doganconsult.com',
      'doganahmet.com',
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
    MAGICAL_LEVEL: process.env.MAGICAL_LEVEL || '2',
    BATTLE_ARENA: process.env.BATTLE_ARENA || 'enabled',
    DEBATE_MODE: process.env.DEBATE_MODE || 'enabled',
    DECK_GENERATOR: process.env.DECK_GENERATOR || 'enabled',
    INTERACTIVE_FEATURES: process.env.INTERACTIVE_FEATURES || 'enabled',
    CROSS_DOMAIN_LINKING: process.env.CROSS_DOMAIN_LINKING || 'enabled',
    TENANT_DOMAIN: process.env.TENANT_DOMAIN || 'doganconsult.com',
    AGENTS: process.env.AGENTS || 'consult-professional,consult-technical',
    THEME: process.env.THEME || 'navy-blue',
    SPECIAL_FEATURES: process.env.SPECIAL_FEATURES || 'architecture-potions,code-golf,debug-detective'
  },

  // Enhanced rewrites for gaming routes
  async rewrites() {
    return [
      // Gaming API routes
      {
        source: '/api/gaming/:path*',
        destination: '/api/gaming/:path*'
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
        source: '/api/magic/:path*',
        destination: '/api/gaming/magic/:path*'
      },
      
      // Agent API routes
      {
        source: '/api/agents/:path*',
        destination: '/api/agents/:path*'
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
            value: process.env.MAGICAL_LEVEL || '2'
          },
          {
            key: 'X-Tenant-Domain',
            value: process.env.TENANT_DOMAIN || 'doganconsult.com'
          },
          {
            key: 'X-Agents',
            value: process.env.AGENTS || 'consult-professional,consult-technical'
          }
        ]
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ];
  },

  // Webpack configuration for gaming features
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Initialize splitChunks if it doesn't exist
    if (!config.optimization) {
      config.optimization = {};
    }
    if (!config.optimization.splitChunks) {
      config.optimization.splitChunks = {};
    }
    if (!config.optimization.splitChunks.cacheGroups) {
      config.optimization.splitChunks.cacheGroups = {};
    }

    // Add gaming paradise optimizations
    config.optimization.splitChunks.cacheGroups.gaming = {
      test: /[\\/]node_modules[\\/](framer-motion|lucide-react|recharts)[\\/]/,
      name: 'gaming',
      chunks: 'all',
    };

    return config;
  },

  // Output configuration
  output: 'standalone',

  // Trailing slash configuration
  trailingSlash: false,

  // Powered by header
  poweredByHeader: false,

  // Compress configuration
  compress: true,

  // React strict mode
  reactStrictMode: true,

  // SWC minify
  swcMinify: true
};

module.exports = nextConfig;
