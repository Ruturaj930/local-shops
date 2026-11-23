# Stage 1: Build the Astro site
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files first for better layer caching
COPY package.json package-lock.json ./

RUN npm ci

# Copy the rest of the project
COPY . .

# Build the static site
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built static files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
