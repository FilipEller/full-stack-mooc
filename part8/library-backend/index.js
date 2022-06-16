const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const Author = require('./models/Author')
const Book = require('./models/Book')

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(name: String!, setBornTo: Int!): Author
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
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      await author.save()

      return author
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
