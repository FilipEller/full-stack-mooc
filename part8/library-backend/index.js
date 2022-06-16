const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const { MONGODB_URI, SECRET } = require('./utils/config')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

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
    me: (root, args, context) => {
      return context.currentUser
    },
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

      return { token: jwt.sign(userForToken, SECRET) }
    },
  },
}

const context = async ({ req }) => {
  const token = req.headers.authorization || ''

  if (token.toLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(token.substring(7), SECRET)
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
