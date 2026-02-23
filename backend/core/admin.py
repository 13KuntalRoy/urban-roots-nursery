from django.contrib import admin
from .models import SiteConfig, Tree, Feature, OrderStep

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'whatsapp_number', 'address')
    
    def has_add_permission(self, request):
        # Only allow one SiteConfig instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

@admin.register(Tree)
class TreeAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'created_at')
    list_filter = ('category',)
    search_fields = ('name', 'description')

@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon_name', 'order')
    list_editable = ('order',)

@admin.register(OrderStep)
class OrderStepAdmin(admin.ModelAdmin):
    list_display = ('step_number', 'title')
    list_editable = ('step_number',)
