from django.db.models import Q

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import UserRegistration, Query, Feedback
from .serializers import (
    UserRegistrationSerializer,
    QuerySerializer,
    FeedbackSerializer
)


@api_view(['GET'])
def profile_api(request, user_id):

    try:
        user = UserRegistration.objects.get(id=user_id)
        serializer = UserRegistrationSerializer(user)
        return Response(serializer.data)

    except UserRegistration.DoesNotExist:

        return Response(
            {
                "error": "User not found"
            },
            status=404
        )


# ---------------- UPDATE PROFILE ---------------- #

@api_view(['PUT'])
def update_profile_api(request, user_id):

    try:

        user = UserRegistration.objects.get(id=user_id)

    except UserRegistration.DoesNotExist:

        return Response(
            {
                "error": "User not found"
            },
            status=404
        )

    serializer = UserRegistrationSerializer(
        user,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "message": "Profile Updated Successfully",
                "data": serializer.data
            }
        )

    return Response(serializer.errors, status=400)


# ---------------- RAISE QUERY ---------------- #

@api_view(['POST'])
def raise_query_api(request):

    serializer = QuerySerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(serializer.errors, status=400)


# ---------------- TRACK QUERY ---------------- #

@api_view(['GET'])
def track_query_api(request, ticket_id):

    try:

        query = Query.objects.get(ticket_id=ticket_id)

        serializer = QuerySerializer(query)

        return Response(serializer.data)

    except Query.DoesNotExist:

        return Response(
            {
                "error": "Ticket not found"
            },
            status=404
        )


# ---------------- FEEDBACK ---------------- #

@api_view(['POST'])
def feedback_api(request):

    serializer = FeedbackSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)


# ---------------- REGISTER ---------------- #

@api_view(['POST'])
def register_api(request):

    serializer = UserRegistrationSerializer(data=request.data)

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data, status=201)

    return Response(serializer.errors, status=400)


# ---------------- VERIFY USER ---------------- #

@api_view(['POST'])
def verify_user_api(request):

    value = request.data.get("email_or_phone")

    try:

        user = UserRegistration.objects.get(
            Q(email=value) | Q(phone=value)
        )

        return Response(
            {
                "message": "User Found",
                "user_id": user.id,
                "security_question": user.security_question
            },
            status=200
        )

    except UserRegistration.DoesNotExist:

        return Response(
            {
                "error": "User not found"
            },
            status=404
        )


# ---------------- SECURITY CHECK ---------------- #

@api_view(['POST'])
def security_check_api(request):

    user_id = request.data.get("user_id")
    security_answer = request.data.get("security_answer")

    try:

        user = UserRegistration.objects.get(id=user_id)

        if user.security_answer.lower() == security_answer.lower():

            return Response(
                {
                    "message": "Verification Successful"
                },
                status=200
            )

        return Response(
            {
                "error": "Incorrect Security Answer"
            },
            status=400
        )

    except UserRegistration.DoesNotExist:

        return Response(
            {
                "error": "User not found"
            },
            status=404
        )