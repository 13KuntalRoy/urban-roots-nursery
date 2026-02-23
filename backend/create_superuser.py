import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'root.settings')
django.setup()

User = get_user_model()

username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if not all([username, email, password]):
    raise ValueError(
        "DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL, and "
        "DJANGO_SUPERUSER_PASSWORD environment variables must all be set."
    )

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"Superuser '{username}' created successfully.")
else:
    print(f"Superuser '{username}' already exists — skipping creation.")
