const Author = require('./models/Author')
const Book = require('./models/Book')
const { UserInputError } = require('apollo-server')

const resolvers = {
  Author: {
    bookCount: async root => {
      const books = await Book.find({ author: root })
      return books.length
    },
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        const author = await Author.find({ name: args.author })
        return Book.find({ genres: args.genre, author: author }).populate(
          'author'
        )
      }
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate('author')
      }
      if (args.author) {
        const author = await Author.find({ name: args.author })
        return Book.find({ author: author }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const { title, published, author, genres } = args

        const authorFromDB = await Author.findOne({ name: author })

        const authorObj = authorFromDB
          ? authorFromDB
          : new Author({ name: author })

        const book = new Book({ title, published, author: authorObj, genres })
        await authorObj.save()
        await book.save()

        return book.populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }

        author.born = args.setBornTo
        await author.save()

        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
  },
}

module.exports = resolvers
