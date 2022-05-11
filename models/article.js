'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate({ User }) {
      // define association here
      // userId
      this.belongsTo(User, { foreignKey: 'userId' })
    }
  }

  Article.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      body: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: 'articles',
      modelName: 'Article'
    }
  )

  return Article
}
