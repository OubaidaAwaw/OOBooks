  // import JWT lib
const jwt = require('jsonwebtoken');
  // load environment variables
require('dotenv').config();

  // JWT verify handler
const verifyJWT = (req, res, next) => {
    // check if the token header is exist
  const reqHeader = req.headers.authorization || req.headers.Authorization
  if(!reqHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    // check the token
  const token = reqHeader.split(" ")[1]
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
        // invalid token
      if(err) return res.sendStatus(430)
        // get the data from the decoded instead
      req.name = decoded.userName
      next()
    }
  )
}

module.exports = verifyJWT 