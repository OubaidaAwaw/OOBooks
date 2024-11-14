  // create DB instance
const data = {
  books: require('../model/books.json'),
  setbooks: function (data) { this.books = data }
}

  // import path module
const path = require('path');
  // import uuid to genarate ids
const uuid = require('uuid')

  // import fs promises
const fsPromises = require('fs').promises;

  // remove the review handler
const deleteReview = async (req, res) => {
      // check if the book exist 
  const isBook = data.books.find(book => book.id === req.params.id)
  if(!isBook) return res.json({
    "error": true,
    "message": `the book is not found!!`
  })
    // check if the data are exist all
  const { reviewId } = req.body
  if(!reviewId) return res.status(400).json({
    "error": true,
    "message": "all the data is required"
  })
    // check the review id
  const isReview = isBook.reviews.find(review => review.reviewId === reviewId)
  if(!isReview) return res.json({
    "error": true,
    "message": "the reviewId is not exist"
  })
    // get other reviews
  const otherReviews = isBook.reviews.filter(review => review.id !== isReview.id)
    // push the new version of review
  isBook.reviews = otherReviews 
  const otherBooks = data.books.filter(book => book.id !== isBook.id)
    // set new data in DB
  data.setbooks([...otherBooks, isBook])
  await fsPromises.writeFile(
    path.join(__dirname, '..' , 'model' , 'books.json'),
    JSON.stringify(data.books)
  )
    // send the response data
  res.status(201).json({
    "error": false,
    "message" : "the review is deleted."
  })
}


  // edit review handler5
const editReview = async (req,res) => {
    // check if the book exist 
  const isBook = data.books.find(book => book.id === req.params.id)
  if(!isBook) return res.json({
    "error": true,
    "message": `the book is not found!!`
  })
    // check if the data are exist all
  const { reviewId, quantitative, qualitative } = req.body
  if(!reviewId || !quantitative || !qualitative) return res.status(400).json({
    "error": true,
    "message": "all the data is required"
  })
    // check the review id
  const isReview = isBook.reviews.find(review => review.reviewId === reviewId)
  if(!isReview) return res.json({
    "error": true,
    "message": "the reviewId is not exist"
  })
    // edit the data
  isReview.quantitative = quantitative
  isReview.qualitative = qualitative
    // get other reviews
  const otherReviews = isBook.reviews.filter(review => review.id !== isReview.id)
    // push the new version of review
  otherReviews.push(isReview)
  isBook.reviews = otherReviews 
  const otherBooks = data.books.filter(book => book.id !== isBook.id)
    // set new data in DB
  data.setbooks([...otherBooks, isBook])
  await fsPromises.writeFile(
    path.join(__dirname, '..' , 'model' , 'books.json'),
    JSON.stringify(data.books)
  )
    // send the response data
  res.status(201).json({
    "error": false,
    "message" : "the review is edited."
  })
}

  // add new review handler5
const addNewReview = async (req, res) => {
    // check if the book exist 
  const isBook = data.books.find(book => book.id === req.params.id)
  if(!isBook) return res.json({
    "error": true,
    "message": `the book is not found!!`
  })
    // add new review to book
  isBook.reviews.push({
    "reviewId": uuid.v4(),
    "feedbackAuthor": req.name,
    "quantitative": req.body.quantitative,
    "qualitative": req.body.qualitative
  })
    // get other books from DB
  const otherBooks = data.books.filter(book => book.id !== isBook.id)
    // set new data in DB
  data.setbooks([...otherBooks, isBook])
  await fsPromises.writeFile(
    path.join(__dirname, '..' , 'model' , 'books.json'),
    JSON.stringify(data.books)
  )
    // send the response data
  res.status(201).json({
    "error": false,
    "message" : "the review is added."
  })
}

  // get all reviews handler
const getAllReviews = async (req, res) => {
    // check if the book exist 
  const isBook = data.books.find(book => book.id === req.params.id)
  if(!isBook) return res.json({
      "error": true,
      "message": `the book is not found!!`
    })
    // return the reviews
  res.json(isBook.reviews)
}

module.exports = {
  getAllReviews,
  addNewReview,
  deleteReview,
  editReview
}