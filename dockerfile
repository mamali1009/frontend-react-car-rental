# Stage 1: Build the React app
FROM node:14 AS builder
 
# Set working directory
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code
COPY . .
 
# Build the React app
RUN npm run build
 
# Stage 2: Serve the React app with Nginx
FROM nginx:alpine
 
# Copy custom Nginx configuration
COPY .nginx/nginx.conf /etc/nginx/nginx.conf
 
## Remove default nginx index pagec
RUN rm -rf /usr/share/nginx/html/*
 
# Copy the build output to the Nginx html directory
COPY --from=builder /app/build /usr/share/nginx/html
 
# Expose port 80
EXPOSE 80
 
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]