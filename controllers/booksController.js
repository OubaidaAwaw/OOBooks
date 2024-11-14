  // create DB instance
const data = {
  books: require('../model/books.json'),
  setbooks: function (data) { this.books = data }
}

  // get all books
const getAllBooks = (req , res) => {
    // return all books
  res.json(data.books)
}

  // get the book by title
const getBookByTitle = (req , res) => {
    // check if the title is exist
  const book = data.books.find(book => book.bookName.toString().toLowerCase() === req.params.title.toString().toLowerCase())
  if(!book) return res.status(400).json({
    "error": true,
    "message": `the book of ${req.params.title.toString().toLowerCase()} not found`
  })
    // if exist
  res.json(book)
}

  // get the book by isbn code
const getBookByisbn = (req , res) => {
    // check if the isbn code is exist
  const book = data.books.find(book => book.ISBNCode.toString().toLowerCase() === req.params.isbn.toString().toLowerCase())
  if(!book) return res.status(400).json({
    "error": true,
    "message": `the book of ${req.params.isbn.toString().toLowerCase()} not found`
  })
    // if exist
  res.json(book)
}

  // get the book by author
const getBookByAuth = (req , res) => {
    // check if the author is exist
  const book = data.books.find(book => book.bookAuthor.toString().toLowerCase() === req.params.author.toString().toLowerCase())
  if(!book) return res.status(400).json({
    "error": true,
    "message": `book author ${req.params.author.toString().toLowerCase()} not found`
  })
    // if exist
  res.json(book)
}

module.exports = {
  getBookByAuth,
  getBookByisbn,
  getBookByTitle,
  getAllBooks
}