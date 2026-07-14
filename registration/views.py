from django.shortcuts import render, redirect
from django.db.models import Q

from .models import UserRegistration, Query
from .forms import (
    UserRegistrationForm,
    QueryForm,
    FeedbackForm,
    VerifyUserForm,
    TrackQueryForm
)


# Registration
def register(request):

    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)

        if form.is_valid():
            form.save()
            return redirect('register')

    else:
        form = UserRegistrationForm()

    return render(
        request,
        'registration/register.html',
        {'form': form}
    )


# Verify User
def verify_user(request):

    if request.method == 'POST':

        form = VerifyUserForm(request.POST)

        if form.is_valid():

            value = form.cleaned_data['email_or_phone']

            user = UserRegistration.objects.filter(
                Q(email=value) | Q(phone=value)
            ).first()

            if user:

                request.session['user_id'] = user.id

                return redirect('security_check')

    else:
        form = VerifyUserForm()

    return render(
        request,
        'registration/verify_user.html',
        {'form': form}
    )


# Security Question Check
def security_check(request):

    user_id = request.session.get('user_id')

    if not user_id:
        return redirect('verify_user')

    user = UserRegistration.objects.get(id=user_id)

    if request.method == 'POST':

        answer = request.POST.get('answer')

        if answer.lower() == user.security_answer.lower():

            request.session['verified_user'] = user.id

            return redirect('dashboard')

    return render(
        request,
        'registration/security_check.html',
        {'user': user}
    )


# Dashboard
def dashboard(request):

    user_id = request.session.get('verified_user')

    if not user_id:
        return redirect('verify_user')

    user = UserRegistration.objects.get(id=user_id)

    return render(
        request,
        'registration/dashboard.html',
        {'user': user}
    )


# View Profile
def view_profile(request):

    user_id = request.session.get('verified_user')

    if not user_id:
        return redirect('verify_user')

    user = UserRegistration.objects.get(id=user_id)

    return render(
        request,
        'registration/view_profile.html',
        {'user': user}
    )


# Update Profile
def update_profile(request):
    print("Update Profile Function Called")

    user_id = request.session.get('verified_user')

    if not user_id:
        return redirect('verify_user')

    user = UserRegistration.objects.get(id=user_id)

    form = UserRegistrationForm(
        request.POST or None,
        instance=user
    )

    if form.is_valid():
        form.save()
        return redirect('view_profile')

    return render(
        request,
        'registration/update_profile.html',
        {'form': form}
    )


# Raise Query
def raise_query(request):

    if request.method == 'POST':

        form = QueryForm(request.POST)

        if form.is_valid():

            query = form.save()

            return render(
                request,
                'registration/query_success.html',
                {
                    'ticket': query.ticket_id
                }
            )

    else:
        form = QueryForm()

    return render(
        request,
        'registration/query.html',
        {'form': form}
    )


# Submit Feedback
def submit_feedback(request):

    if request.method == 'POST':

        form = FeedbackForm(request.POST)

        if form.is_valid():

            feedback = form.save()

            return render(
                request,
                'registration/feedback_success.html',
                {
                    'feedback_id': feedback.feedback_id
                }
            )

    else:
        form = FeedbackForm()

    return render(
        request,
        'registration/feedback.html',
        {'form': form}
    )

def track_query(request):

    query = None

    if request.method == 'POST':

        form = TrackQueryForm(request.POST)

        if form.is_valid():

            ticket_id = form.cleaned_data['ticket_id']

            query = Query.objects.filter(
                ticket_id=ticket_id
            ).first()

    else:
        form = TrackQueryForm()

    return render(
        request,
        'registration/track_query.html',
        {
            'form': form,
            'query': query
        }
    )