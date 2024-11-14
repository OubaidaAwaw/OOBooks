  // import express
  const express = require('express');

  // declare express router
const router = express.Router();

  // import reviews controller
const reviewsController = require('../../controllers/reviewsController');

  // get all reviews
router.route('/:id').get(reviewsController.getAllReviews)

  // add new review
router.route('/:id').post(reviewsController.addNewReview)
  
  // edit review
router.route('/:id').put(reviewsController.editReview)

  // delete review
router.route('/:id').delete(reviewsController.deleteReview)

module.exports = router

