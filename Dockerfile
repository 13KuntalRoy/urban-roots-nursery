# Build Stage: Frontend
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY bloom-branch-boutique-main/package*.json ./
RUN npm install
COPY bloom-branch-boutique-main/ ./
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Final Stage: Python + Caddy
FROM python:3.12-slim
WORKDIR /app

# Install system dependencies + Caddy
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    debian-keyring \
    debian-archive-keyring \
    apt-transport-https \
    && curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg \
    && curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list \
    && apt-get update && apt-get install -y caddy \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source and frontend build
COPY backend/ ./backend/
COPY --from=frontend-build /app/frontend/dist /srv
COPY Caddyfile /etc/caddy/Caddyfile

# Copy entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

WORKDIR /app/backend

EXPOSE 80 8000

CMD ["/app/entrypoint.sh"]
