'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.addColumn('recipes', 'createdByUserId', {
        type: Sequelize.INTEGER
      })
      resolve()
    })
  },

  down: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.removeColumn('recipes', 'createdByUserId')
      resolve()
    })
  }
};
