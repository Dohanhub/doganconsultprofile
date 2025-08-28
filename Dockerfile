# DoganConsult Gaming Paradise Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Create necessary directories
RUN mkdir -p /app/public/brand
RUN mkdir -p /app/public/shared
RUN mkdir -p /app/public/shared-assets

# Copy brand assets
COPY assets/ /app/public/brand/
COPY shared/assets/ /app/public/shared/

# Build the application
RUN npm run build

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3002/api/health || exit 1

# Start the application
CMD ["npm", "start"]
