  // import express
const express = require("express")

  // import cookieParser to use cookies
const cookieParser = require("cookie-parser");

  // declare the app instance
const app = express()

  // let the server work on port 5000 
app.listen(5000);

  // json middleware
app.use(express.json())

  // cookieParser middleware
app.use(cookieParser());

  // the main root "/"
app.use("/OOBooks/",require('./router/Root'))

  // registration route
app.use("/OOBooks/register", require('./router/Register'))

  // login route
app.use("/OOBooks/login", require('./router/Login'))

  // refresh token route
app.use('/OOBooks/refresh', require('./router/RefreshToken'));

  // verifyJWT before all endpoints for more secure
app.use(require("./middleware/verifyJWT"))

  // books endpoints
app.use("/OOBooks/books", require("./router/api/books"))

  // reviews endpoints
app.use("/OOBooks/reviews", require("./router/api/reviews"))

  // error routes
app.all('*', require('./middleware/RoutesError'));

  // [+499] server errors handler
app.use(require('./middleware/ServerError'))
