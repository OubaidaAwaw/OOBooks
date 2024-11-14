  // import express
const express = require("express")

  // import register controller
const registerController = require("../controllers/registerController")

  // declare express router
const router = express.Router()

  // create post request for registeration
router.post('/', registerController.NewUserHandler)


module.exports = router