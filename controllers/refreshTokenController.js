  // create DB instance
const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}

  // import JWT lib
const jwt = require('jsonwebtoken');

  // load environment variables
require('dotenv').config();

  // ****************************************** refresh the user token handler
const RefreshTokenHandler = async (req, res) => {
    // get the user Cookies
  const cookies = req.cookies;
    // check if the jwt cookie is exist
  if (!cookies?.jwt) return res.sendStatus(401);
    // store the refreshToken from user and compare with DB
  const refreshToken = cookies.jwt;
  const foundUser = usersDB.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403); // the user is Forbidden 
    // verify token with jwt if exist
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser.userName !== decoded.userName) return res.sendStatus(403);
        // create new access jwt token
      const accessToken = jwt.sign(
        {
          "userName": decoded.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { 
          expiresIn: '15m' 
        }
      );
        // send the new token
      res.json({ accessToken })
    }
  );
}
// ****************************************** refresh the user token handler

module.exports = { RefreshTokenHandler }