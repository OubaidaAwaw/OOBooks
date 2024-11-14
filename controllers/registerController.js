  // create DB instance
const usersDB = {
    users: require('./../model/users.json'),
    setUsers: function (data) { this.users = data }
}
  // import bcrypt hash lib
const bcrypt = require("bcryptjs")
  // import path module
const path = require('path');
  // import promises fs module
const fsPromises = require('fs').promises;

  // ****************************************** register user handler
const NewUserHandler = async (req, res) =>{
    // get the request body
  const { userName : name , password} = req.body;
    // check if both of data is exist
  if (!name || !password) return res.status(400).send({
      "error" : true,
      'message': 'user name and password are required!!' 
    });
    // check for duplicate usernames in the db
  const isDuplicate = usersDB.users.find(user => user.userName === name);
    // if we have duplicate return Conflict by 409
  if(isDuplicate) return res.status(409).send({
    'error': true,
    'message': "the user is exist before"
  }); 
  try{
      // hash the password and put some salt
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt);
      // create new user obj
    const newUser = {
      id: usersDB.users.length,
      userName: name,
      password: hashedPass,
      token: "thisIsTheRefresh.TokenSecretCode.WhichShouldBeMoreComplex"
    }
      // set the new user to the DB instance
    usersDB.setUsers([...usersDB.users, newUser]);
      // set the data to the DB
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(usersDB.users)
    );
      // send the response 201 is created
    res.status(201).json({
      "error": false, 
      'success': `new user ${name} is created!` 
    });
  }catch(err){
      // throw error form the server
    res.status(500).json({
      "error": true,
      'message': err.message 
    });
  }
}
// ****************************************** register user handler

module.exports = {NewUserHandler}