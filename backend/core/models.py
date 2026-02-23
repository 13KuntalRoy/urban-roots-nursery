from django.db import models

class SiteConfig(models.Model):
    site_name = models.CharField(max_length=100, default="UrbanRoots Nursery")
    whatsapp_number = models.CharField(max_length=20, default="6291381840")
    address = models.TextField(default="220, JC Bose Rd, H B Town, Pallysree, Panihati, Khardaha, West Bengal 700110")
    hero_title = models.CharField(max_length=200, default="Bring Nature Home")
    hero_subtitle = models.TextField(default="Premium trees handpicked for your garden. Order through WhatsApp and we'll deliver beauty to your doorstep.")
    
    def __str__(self):
        return self.site_name

    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"

class Tree(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='trees/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Tree"
        verbose_name_plural = "Trees"
        ordering = ['name']

class Feature(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, help_text="Lucide icon name (e.g., Truck, ShieldCheck, Leaf)")
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['order']

class OrderStep(models.Model):
    step_number = models.PositiveIntegerField()
    title = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"Step {self.step_number}: {self.title}"

    class Meta:
        verbose_name = "Order Step"
        verbose_name_plural = "Order Steps"
        ordering = ['step_number']
