const { ApolloServer } = require('apollo-server')
const typeDefs = require('./src/schema')
const resolvers = require('./src/resolver')
const { auth } = require('./utils/auth')
require('dotenv').config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.get('Authorization') || ''
    return { user: auth(token.replace('Bearer', '')) }
  }
})

const port = process.env.PORT || 4000

server.listen().then(() => console.log(`Server is running on port ${port}`))
