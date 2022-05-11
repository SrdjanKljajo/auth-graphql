const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.auth = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET)
    }
    return null
  } catch (error) {
    return null
  }
}
