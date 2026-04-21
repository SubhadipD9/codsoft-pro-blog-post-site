FROM node:22-alpine

# 1. Optimise for production
ENV NODE_ENV=production

WORKDIR /app

# 2. Set permissions for the built-in 'node' user
RUN chown node:node /app

USER node

# 3. Cache dependencies
COPY --chown=node:node package*.json ./
RUN npm ci --only=production

# 4. Copy application source
COPY --chown=node:node . .

# 5. Inform Docker that the container listens on port 3000
EXPOSE 5173

# Run Vite in dev mode, accessible outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]