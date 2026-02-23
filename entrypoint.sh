#!/bin/bash
set -e

echo "==> Collecting static files..."
python manage.py collectstatic --noinput

echo "==> Running database migrations..."
python manage.py migrate --noinput

# Only create superuser if all required env vars are present
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_EMAIL" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ]; then
    echo "==> Creating superuser (if not exists)..."
    python create_superuser.py
else
    echo "==> Skipping superuser creation (env vars not set)."
fi

echo "==> Starting Gunicorn..."
gunicorn --bind 0.0.0.0:8000 --workers 2 --timeout 120 root.wsgi:application &

echo "==> Starting Caddy..."
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
