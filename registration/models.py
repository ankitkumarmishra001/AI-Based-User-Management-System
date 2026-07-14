from django.db import models
import uuid


class UserRegistration(models.Model):
    full_name = models.CharField(max_length=100)
    gender = models.CharField(max_length=10)
    age = models.PositiveIntegerField()

    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)

    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    occupation = models.CharField(max_length=100)
    hobby = models.CharField(max_length=100)

    security_question = models.CharField(max_length=255)
    security_answer = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name


class Query(models.Model):

    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),
        ('RESOLVED', 'Resolved'),
    ]

    ticket_id = models.CharField(
        max_length=50,
        unique=True,
        blank=True
    )

    user = models.ForeignKey(
        UserRegistration,
        on_delete=models.CASCADE
    )

    query_text = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='OPEN'
    )

    admin_response = models.TextField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):
        if not self.ticket_id:
            self.ticket_id = "TKT-" + str(uuid.uuid4())[:8].upper()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.ticket_id


class Feedback(models.Model):

    feedback_id = models.CharField(
        max_length=50,
        unique=True,
        blank=True
    )

    user = models.ForeignKey(
        UserRegistration,
        on_delete=models.CASCADE
    )

    feedback_text = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):
        if not self.feedback_id:
            self.feedback_id = "FDB-" + str(uuid.uuid4())[:8].upper()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.feedback_id