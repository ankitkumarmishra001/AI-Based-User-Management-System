from django.contrib import admin
from .models import UserRegistration, Query, Feedback

admin.site.register(UserRegistration)
admin.site.register(Query)
admin.site.register(Feedback)