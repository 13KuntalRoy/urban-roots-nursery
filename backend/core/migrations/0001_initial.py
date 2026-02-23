from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Feature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('icon_name', models.CharField(help_text='Lucide icon name (e.g., Truck, ShieldCheck, Leaf)', max_length=50)),
                ('order', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='OrderStep',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('step_number', models.PositiveIntegerField()),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
            ],
            options={
                'ordering': ['step_number'],
            },
        ),
        migrations.CreateModel(
            name='SiteConfig',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site_name', models.CharField(default='UrbanRoots Nursery', max_length=100)),
                ('whatsapp_number', models.CharField(default='6291381840', max_length=20)),
                ('address', models.TextField(default='220, JC Bose Rd, H B Town, Pallysree, Panihati, Khardaha, West Bengal 700110')),
                ('hero_title', models.CharField(default='Bring Nature Home', max_length=200)),
                ('hero_subtitle', models.TextField(default="Premium trees handpicked for your garden. Order through WhatsApp and we'll deliver beauty to your doorstep.")),
            ],
            options={
                'verbose_name': 'Site Configuration',
                'verbose_name_plural': 'Site Configuration',
            },
        ),
        migrations.CreateModel(
            name='Tree',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('category', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='trees/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
