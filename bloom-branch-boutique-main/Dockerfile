# Build stage
FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Final stage - we just need the dist folder
FROM alpine:latest
WORKDIR /app
COPY --from=build /app/dist ./dist
CMD ["sleep", "infinity"]
