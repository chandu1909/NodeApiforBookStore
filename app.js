var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var prettyjs = require('prettyjson');

app.use(bodyParser.json())

Genre = require('./models/genre')
Book = require('./models/book')

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.Connection;

app.get('/', function (req, res) {
    res.send('Please use /api/books or /api/books/genre');
});
//get genres
app.get('/api/genre', function (req, res) {
   Genre.getGenres(function (err, genre) {
       if(err){
           throw err;
       }
       res.json(genre);
       //prettyjs(res.json(genre));
   });
});

//to get home page
app.get('/', function (req, res) {
    res.send('Please use /api/books or /api/books/genre');
});

//add genre
app.post('/api/genre', function (req, res) {
    var genre = req.body;
    Genre.addGenre(genre, function (err, genre) {
        if(err){
            throw err;
        }
        res.json(genre);

    });
});

//Add Books
app.post('/api/books', function (req, res) {
    var book = req.body;
    Book.addBook(book, function (err, book) {
        if(err){
            throw err;
        }
        res.json(book);

    });
});

//get books
app.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
        if(err){
            throw err;
        }
        res.json(books);
    });
});

//get books by id
app.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
        if(err){
            throw err;
        }
        res.json(book);
    });
});

//update genre
app.put('/api/genre/:_id', function (req, res) {
    var id = req.params._id;
    var genre = req.body;

    Genre.updateGenre(id,genre,{}, function (err, genre) {
        if(err){
            throw err;
        }
        res.json(genre);

    });
});

//update book
app.put('/api/books/:_id', function (req, res) {
    var id = req.params._id;
    var book = req.body;

    Book.updateBook(id,book,{}, function (err, book) {
        if(err){
            throw err;
        }
        res.json(book);

    });
});

//delete genre
app.delete('/api/genres/:_id', function (req, res) {
    var id = req.params._id;

    Genre.removeGenre(id, function (err,genre) {
        if(err){
            throw err;
        }
        res.json(genre);

    });
});

app.listen(3000);
console.log('Running on Port 3000');
