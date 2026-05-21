from django.shortcuts import render
from .models import Author, Book, Borrow
from .serializers import AuthorSerializer, BookSerializer, BorrowSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

# Create your views here.

@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({'message': 'Username already exists'})
    user = User.objects.create_user(username=username,password=password)
    return Response({'message': 'User Registered'})

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token),})
    return Response({'message': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def author_view(request):
    if request.method == "GET":
        author = Author.objects.all()
        serializer = AuthorSerializer(author, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = AuthorSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def author_details(request, id):
    author = Author.objects.get(id=id)
    if request.method == 'GET':
        serializer = AuthorSerializer(author)
        return Response(serializer.data)
    if request.method == "PUT":
        serializer = AuthorSerializer(author, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    if request.method == 'DELETE':
        author.delete()
        return Response({'message':'Deleted'})
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def book_view(request):
    if request.method == 'GET':
        book = Book.objects.all()
        serializer = BookSerializer(book, many = True)
        return Response(serializer.data)
    if request.method == "POST":
        serializer = BookSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def book_details(request, id):
    book = Book.objects.get(id=id)
    if request.method == 'GET':
        serializer = BookSerializer(book)
        return Response(serializer.data)
    if request.method == "PUT":
        serializer = BookSerializer(book, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    if request.method == 'DELETE':
        book.delete()
        return Response({'message':'Deleted'})
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def borrow_view(request):
    if request.method == 'GET':
        borrow = Borrow.objects.all()
        serializer = BorrowSerializer(borrow, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        book_id = request.data.get('book')
        book = Book.objects.get(id=book_id)
        if book.available_copies <= 0:
            return Response({'message': 'No copies available'})
        serializer = BorrowSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            book.available_copies -= 1
            book.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def borrow_details(request, id):
    borrow = Borrow.objects.get(id=id)
    if request.method == 'GET':
        serializer = BorrowSerializer(borrow)
        return Response(serializer.data)
    if request.method == "PUT":
        serializer = BorrowSerializer(borrow, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    if request.method == 'DELETE':
        borrow.delete()
        return Response({'message':'Deleted'})
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def return_book(request, id):
    borrow = Borrow.objects.get(id=id)
    book = borrow.book
    book.available_copies += 1
    book.save()
    borrow.delete()
    return Response({'message': 'Book Returned'})

    







