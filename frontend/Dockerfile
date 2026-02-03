# Stage 1: Build Angular application for production
FROM public.ecr.aws/docker/library/node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build Angular application using production configuration (environment.prod.ts)
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM public.ecr.aws/nginx/nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist/frontend_taskify/browser /usr/share/nginx/html

# Configure Nginx to listen on port 4200 and handle Angular routing
RUN echo 'server { \
    listen 4200; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    # Security headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]