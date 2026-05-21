from django.urls import path
from .views import *

urlpatterns = [
    path('register/', register_view),
    path('login/', login_view),
    path('author_view/', author_view),
    path('author_details/<int:id>/', author_details),
    path('book_view/', book_view),
    path('book_details/<int:id>/', book_details),
    path('borrow_view/', borrow_view),
    path('borrow_details/<int:id>/', borrow_details),
    path('return_book/<int:id>/', return_book),
]