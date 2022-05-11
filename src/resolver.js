const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const models = require('../models')
//const checkPermissions = require('../validateRole')
require('dotenv').config()

const resolvers = {
  Query: {
    async me(_, args, { user }) {
      if (!user) throw new Error('You are not authenticated')
      return await models.User.findByPk(user.id)
    },
    async user(root, { id }, { user }) {
      try {
        //if (!user) throw new Error('You are not authenticated!')
        return models.User.findByPk(id)
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async allUsers(root, args, { user }) {
      try {
        //if (!user || user.role !== 'admin')
        //throw new Error('You are not authorized for this tipe action')
        return models.User.findAll()
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async article(root, { id }) {
      try {
        const article = await models.Article.findByPk(id)
        if (!article) throw new Error('Article not found')
        return article
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async allArticles(root, args) {
      try {
        return await models.Article.findAll()
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },
  Mutation: {
    async registerUser(
      root,
      { username, email, osName, ipAddress, role, password }
    ) {
      const user = await models.User.findOne({ where: { email } })
      if (user) throw new Error('User with this email already exist')
      try {
        const user = await models.User.create({
          username,
          email,
          role,
          osName,
          ipAddress,
          password: await bcrypt.hash(password, 10)
        })
        const token = jsonwebtoken.sign(
          {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          },
          process.env.JWT_SECRET,
          { expiresIn: '1y' }
        )
        return {
          token,
          user,
          message: 'Authentication succesfull'
        }
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async login(_, { email, password }) {
      try {
        const user = await models.User.findOne({ where: { email } })
        if (!user) {
          throw new Error('No user with that email')
        }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) {
          throw new Error('Incorrect password')
        }
        // return jwt
        const token = jsonwebtoken.sign(
          {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          },
          process.env.JWT_SECRET,
          { expiresIn: '100d' }
        )

        return {
          token,
          user
        }
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async updateUser(root, { id, username, password }, { user }) {
      try {
        if (!user) throw new Error('You are not authenticated!')
        await models.User.update({ username, password }, { where: { id } })
        return 'Update success'
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async updateUserRole(root, { id, role }, { user }) {
      try {
        if (user.role !== 'admin') throw new Error('You are not authorized!')
        await models.User.update({ role }, { where: { id } })
        return 'Update role success'
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async deleteUser(root, { id }, { user }) {
      try {
        //if (user.role !== 'admin') throw new Error('You are not authorized!')
        const delUser = await models.User.findByPk(id)
        if (!delUser) throw new Error('User not found')
        await models.User.destroy({ where: { id } })
        return 'Successfuly deleted'
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async createArticle(root, { title, body }, { user }) {
      try {
        if (!user) throw new Error('You are not authenticated!')
        return models.Article.create({
          userId: user.id,
          title,
          body
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async updateArticle(root, { id, title, body }, { user }) {
      try {
        if (!user) throw new Error('You are not authenticated!')
        await models.Article.update({ title, body }, { where: { id } })
        return 'Update success'
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async deleteArticle(root, { id }, { user }) {
      try {
        //if (!user) throw new Error('You are not authenticated!')
        const article = await models.Article.findByPk(id)
        if (!article) throw new Error('Article not found')
        await models.Article.destroy({ where: { id } })
        return 'Article deleted'
      } catch (error) {
        throw new Error(error.message)
      }
    }
  },
  User: {
    async articles(user) {
      return user.getArticles()
    }
  },
  Article: {
    async user(article) {
      return article.getUser()
    }
  }
}

module.exports = resolvers
