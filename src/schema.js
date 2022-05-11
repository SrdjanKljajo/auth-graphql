const { gql } = require('apollo-server')
const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    role: String!
    osName: String!
    ipAddress: String!
    articles: [Article!]!
  }
  type Article {
    id: Int!
    title: String!
    body: String!
    user: User!
  }
  type AuthPayload {
    token: String!
    user: User
    message: String!
  }
  type Query {
    user(id: Int!): User
    allUsers: [User!]!
    me: User
    article(id: Int!): Article
    allArticles: [Article!]!
  }
  type Mutation {
    registerUser(
      username: String!
      email: String!
      password: String!
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateUser(id: Int!, username: String!, password: String!): String!
    updateUserRole(id: Int!, role: String!): String!
    deleteUser(id: Int!): String
    createArticle(userId: Int, title: String!, body: String!): Article!
    updateArticle(id: Int!, title: String!): String
    deleteArticle(id: Int!): String
  }
`
module.exports = typeDefs
