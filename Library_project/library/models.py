from django.db import models

# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    published_date = models.DateField()
    available_copies = models.IntegerField()

    def __str__(self):
        return self.title
    
class Borrow(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrowed_date = models.DateField(auto_now_add=True)
    return_date = models.DateField()

    def __str__(self):
        return self.name

