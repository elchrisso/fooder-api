'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.createTable('food', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        name: Sequelize.STRING,
        description: Sequelize.STRING
      })
      resolve()
    })
  },

  down: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.dropTable('food')
      resolve()
    })
  }
};
