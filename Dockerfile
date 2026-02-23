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

# Install system dependencies
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

# Backend setup
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ ./backend/
WORKDIR /app/backend

# Frontend build artifacts
COPY --from=frontend-build /app/frontend/dist /srv

# Root config for Caddy
COPY Caddyfile /etc/caddy/Caddyfile

# Entrypoint script to run both processes
RUN echo '#!/bin/bash\n\
    python manage.py collectstatic --noinput\n\
    python manage.py migrate --noinput\n\
    python create_superuser.py\n\
    gunicorn --bind 0.0.0.0:8000 root.wsgi:application & \n\
    caddy run --config /etc/caddy/Caddyfile --adapter caddyfile\n\
    wait -n' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

EXPOSE 80 443 8000

CMD ["/app/entrypoint.sh"]
