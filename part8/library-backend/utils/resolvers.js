const { UserInputError, AuthenticationError } = require('apollo-server')
const Author = require('../models/Author')
const Book = require('../models/Book')
const User = require('../models/User')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const resolvers = {
  Author: {
    bookCount: root => root.books.length,
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
    allAuthors: async () => Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        const { title, published, author, genres } = args

        const authorFromDB = await Author.findOne({ name: author })

        const authorObj = authorFromDB
          ? authorFromDB
          : new Author({ name: author })

        const book = new Book({ title, published, author: authorObj, genres })
        authorObj.books = [...authorObj.books, book.id]
        await authorObj.save()
        await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author') })

        return book.populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

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
    createUser: async (root, args) => {
      try {
        const user = new User({
          username: args.username,
          favouriteGenre: args.favouriteGenre,
        })
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!(user && args.password === 'secret')) {
        throw new UserInputError('Invalid credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
