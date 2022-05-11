'use strict'
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      body: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('articles')
  }
}
