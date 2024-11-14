  // import express
const express = require('express');

  // declare express router
const router = express.Router();

  // import books controller
const booksController = require('../../controllers/booksController');

  // return all books
router.route('/').get(booksController.getAllBooks)

  // get books by author
router.route('/author/:author').get(booksController.getBookByAuth)

  // get books by isbn code
router.route('/isbn/:isbn').get(booksController.getBookByisbn)

  // get books by title
router.route('/title/:title').get(booksController.getBookByTitle)

module.exports = router