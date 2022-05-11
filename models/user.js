'use strict'
const { Model } = require('sequelize')
const { OSName, IPAddress } = require('../ipLocator')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Article }) {
      // define association here
      // userId
      this.hasMany(Article, { foreignKey: 'userId' })
    }
  }

  User.init(
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING
      },
      osName: {
        defaultValue: OSName,
        type: DataTypes.STRING
      },
      ipAddress: {
        defaultValue: IPAddress,
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have a role' },
          isIn: {
            args: [['admin', 'user']],
            msg: 'Role must be admin, moderator or user'
          }
        }
      }
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User'
    }
  )

  return User
}
