const { UserInputError } = require('apollo-server')
const { SECRET } = require('./config')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const context = async ({ req }) => {
  try {
    const token = req.headers.authorization || ''

    if (token.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(token.substring(7), SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  } catch (error) {
    throw new UserInputError(error.message, {
      invalidArgs: req.headers.authorization,
    })
  }
}

module.exports = context
