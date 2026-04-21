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
EXPOSE 3000

# 6. Use the correct array syntax
# If your package.json has "start": "node server.js", use the first one.
CMD [ "node", "--watch", "server.js"]
