'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.createTable('foods_recipes', {
        foodId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        recipeId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      }).then(() => {
        queryInterface.addIndex('foods_recipes', ['foodId', 'recipeId'], {
          indexName: 'join_foods_recipes',
          indicesType: 'INDEX'
        })
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('foods_recipes')
  }
};
