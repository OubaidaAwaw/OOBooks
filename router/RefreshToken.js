  // import express
const express = require('express');

  // declare express router
const router = express.Router();

  // import register controller
const refreshTokenController = require('../controllers/refreshTokenController');
  
  // create get request for new user token
router.get('/', refreshTokenController.RefreshTokenHandler);

module.exports = router;