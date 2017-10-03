'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.addConstraint('food', ['name'], {
        type: 'unique',
        name: 'foodName'
      })
      resolve()
    })
  },

  down: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.removeConstraint('food', 'foodName')
      resolve()
    })
  }
};
