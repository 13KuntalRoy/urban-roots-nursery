from rest_framework import serializers
from .models import SiteConfig, Tree, Feature, OrderStep

class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = '__all__'

class TreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tree
        fields = '__all__'

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'

class OrderStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStep
        fields = '__all__'
