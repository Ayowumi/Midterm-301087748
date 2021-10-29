// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Book Details',
    books: {}
  })
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  const form_data = {
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  }

  new book(form_data).save().then(() => {
    res.redirect('/books')
  }).catch(err => {
    res.render('/books/add', {
      title: 'Book Details',
      books: form_data
    } )
  })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;
 
  book.findById(id).then(data => {
    if (!data) {
      res.redirect('/books')
   }else {
    res.render('books/details', {
      title: 'Book Details',
      books: data
    })
  }
  })
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  const id = req.params.id

  const form_data = {
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  }

  book.findByIdAndUpdate(id, form_data).then(() => {
    res.redirect('/books');
  }).catch(error => {
    res.redirect('/books');
  })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  const id = req.params.id;
  book.findByIdAndDelete(id).then(data => {
    res.redirect('/books');
  }).catch(error => {
    res.redirect('/books');
  })
});


module.exports = router;
