var mongoose = require('mongoose');

//Book Schema
var bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true //validation
    },
    genre:{
      type : String,
      required : true
    },
    Description:{
        type : String,
        required : true
    },
    Author:{
        type : String,
        required : true
    },

    create_date:{
        type: Date,
        default: Date.now //automatically insert date value
    }
});

var Book = module.exports = mongoose.model('Book', bookSchema);

//get Books
module.exports.getBooks = function(callback, limit) {
    Book.find(callback).limit(limit);
}

//get Book
module.exports.getBookById = function(id,callback) {
    Book.findById(id,callback);
}

//Add Book
module.exports.addBook = function(book, callback) {
    Book.create(book, callback);
}
//Update book
module.exports.updateBook = function(id, book, options, callback) {
    var query = {_id:id};
    var update = {
        title: book.title,
        genre: book.genre,
        description: book.description,
        author: book.author

    }
    Book.findOneAndUpdate(query,update,options, callback);
}
