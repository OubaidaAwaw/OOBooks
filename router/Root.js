  // import express
const express = require('express');
  // import express router
const router = express.Router();

  // declare the router route
router.get('/', (req, res) => {
    // send the instructions of the routes in this project
  res.send({
    instructions: "hello world"
  })
});

module.exports = router;