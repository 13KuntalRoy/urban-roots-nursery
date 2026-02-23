from django.urls import path
from .views import SiteConfigDetail, TreeList, FeatureList, OrderStepList

urlpatterns = [
    path('config/', SiteConfigDetail.as_view(), name='site-config'),
    path('trees/', TreeList.as_view(), name='tree-list'),
    path('features/', FeatureList.as_view(), name='feature-list'),
    path('order-steps/', OrderStepList.as_view(), name='order-step-list'),
]
