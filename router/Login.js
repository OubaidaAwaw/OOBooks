  // import express
const express = require("express")

  // import Login controller
const LoginController = require("../controllers/loginController")

  // declare express router
const router = express.Router()

  // create post requist for Login
router.post('/', LoginController.LoginHandler)

module.exports = router