'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.removeColumn('recipes', 'creator')
      resolve()
    })
  },

  down: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.addColumn('recipes', 'creator')
      resolve()
    })
  }
};
