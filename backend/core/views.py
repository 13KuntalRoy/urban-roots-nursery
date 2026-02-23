from rest_framework import generics
from .models import SiteConfig, Tree, Feature, OrderStep
from .serializers import SiteConfigSerializer, TreeSerializer, FeatureSerializer, OrderStepSerializer

class SiteConfigDetail(generics.RetrieveAPIView):
    serializer_class = SiteConfigSerializer
    
    def get_object(self):
        obj, created = SiteConfig.objects.get_or_create(id=1)
        return obj

class TreeList(generics.ListAPIView):
    queryset = Tree.objects.all()
    serializer_class = TreeSerializer

class FeatureList(generics.ListAPIView):
    queryset = Feature.objects.all().order_by('order')
    serializer_class = FeatureSerializer

class OrderStepList(generics.ListAPIView):
    queryset = OrderStep.objects.all().order_by('step_number')
    serializer_class = OrderStepSerializer
