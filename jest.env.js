// Jest environment setup for Gaming Paradise
process.env.NODE_ENV = 'test'
process.env.PORT = '3002'
process.env.GAMING_MODE = 'enabled'
process.env.MAGICAL_LEVEL = '2'
process.env.BATTLE_ARENA = 'enabled'
process.env.DEBATE_MODE = 'enabled'
process.env.DECK_GENERATOR = 'enabled'
process.env.INTERACTIVE_FEATURES = 'enabled'
process.env.CROSS_DOMAIN_LINKING = 'enabled'
process.env.TENANT_DOMAIN = 'doganconsult.com'
process.env.AGENTS = 'consult-professional,consult-technical'
process.env.THEME = 'navy-blue'
process.env.SPECIAL_FEATURES = 'architecture-potions,code-golf,debug-detective'

// Database connections for testing
process.env.MONGODB_URI = 'mongodb://localhost:27017/doganconsult-test'
process.env.REDIS_URL = 'redis://localhost:6379/1'

// API keys for testing
process.env.JWT_SECRET = 'test-jwt-secret-key'
process.env.API_KEY = 'test-api-key'
process.env.ENCRYPTION_KEY = 'test-encryption-key'

// External services for testing
process.env.OPENAI_API_KEY = 'test-openai-key'
process.env.AZURE_OPENAI_ENDPOINT = 'https://test.openai.azure.com/'
process.env.AZURE_OPENAI_API_KEY = 'test-azure-key'

// Gaming Paradise specific test environment
process.env.GAMING_PARADISE_VERSION = '2.0.0'
process.env.TEST_MODE = 'enabled'
process.env.MOCK_AI_RESPONSES = 'enabled'
process.env.DISABLE_REAL_API_CALLS = 'enabled'
