const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config')

const Book = require('../models/Book')
const Author = require('../models/Author')

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const fix = async () => {
  const books = await Book.find({})

  for (const book of books) {
    const author = await Author.findById(book.author)
    const books = [...author.books.map(id => id.toString()), book.id]
    const uniqueBooks = [...new Set(books)]
    author.books = uniqueBooks
    await author.save()
  }
}

const main = async () => {
  await fix()
  console.log('done')
  mongoose.connection.close()
}

main()
