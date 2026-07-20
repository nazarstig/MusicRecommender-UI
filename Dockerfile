# Stage 1: build the Angular app
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Stage 2: serve the compiled app with nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist/music-recommender/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
