  // error server middleware
const errorHandler = (err, req, res) => {
    // send error
  res.status(500).send(err.message);
}

module.exports = errorHandler;