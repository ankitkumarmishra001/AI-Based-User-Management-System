from django import forms
from .models import UserRegistration, Query, Feedback

class UserRegistrationForm(forms.ModelForm):
    class Meta:
        model = UserRegistration

        fields = [
            'full_name',
            'gender',
            'age',
            'email',
            'phone',
            'city',
            'state',
            'country',
            'occupation',
            'hobby',
            'security_question',
            'security_answer',
        ]

        widgets = {
            'security_answer': forms.PasswordInput(),
        }

class QueryForm(forms.ModelForm):
    class Meta:
        model = Query
        fields = ['user', 'query_text']


class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ['user', 'feedback_text']

class VerifyUserForm(forms.Form):
    email_or_phone = forms.CharField(
        label="Email or Phone Number",
        max_length=100
    )

class TrackQueryForm(forms.Form):
    ticket_id = forms.CharField(
        label='Ticket Number',
        max_length=50
    )