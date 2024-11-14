  // create DB instance
const usersDB = {
  users: require('../model/users.json'),
  setUsers: function (data) { this.users = data }
}
  // import bcrypt hash lib
const bcrypt = require('bcryptjs') 

  // import JWT lib
const jwt = require('jsonwebtoken') 
  // load environment variables
require('dotenv').config() 
  // import promises fs module
const fsPromises = require('fs').promises 
  // import path module
const path = require('path') 

  // ****************************************** Login user handler
const LoginHandler = async (req, res) => {
    // get the request body
  const { userName : name , password} = req.body 
    // check if both of data is exist
  if (!name || !password) return res.status(400).send({
      "error" : true,
      'message': 'user name and password are required!!' 
    }) 
    // check for duplicate usernames in the db
  const FindUser = usersDB.users.find(user => user.userName === name) 
    // if we have duplicate return Conflict by 409
  if(!FindUser) return res.status(401).send({
    'error': true,
    'message': "the user isn't exist before"
  })  
    // evaluate the password
  const isMatchPass = await bcrypt.compare(password, FindUser.password)
  if (isMatchPass) {
      // create new accessToken
    const accessToken = jwt.sign(
      {
        "userName": FindUser.userName
      },
      process.env.ACCESS_TOKEN_SECRET,
      { 
        expiresIn: '15m' 
      }
    ) 
      // create new refreshToken
    const refreshToken = jwt.sign(
      { 
        "userName": FindUser.userName
      },
      process.env.REFRESH_TOKEN_SECRET,
      { 
        expiresIn: '1d' 
      }
    ) 
      // Saving refreshToken with current user
    const otherUsers = usersDB.users.filter(user => user.userName !== FindUser.userName)
    const currentUser = { ...FindUser, refreshToken }
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    ) 
      // set cookies in the user browser
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
      // send the response
    res.json({
      accessToken
    })
  } else {
      // throw unmatch error 
    res.status(401).send({
      'error' : true,
      'message': 'unmatch password!!' 
    }) 
  }
}
// ****************************************** Login user handler

module.exports = { LoginHandler }