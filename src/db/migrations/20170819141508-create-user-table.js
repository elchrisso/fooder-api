'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject)=> {
      queryInterface.createTable('user', {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: Sequelize.DATE,
        email: {
          allowNull: false,
          type: Sequelize.STRING
        },
        hashedPassword: {
          allowNull: false,
          type: Sequelize.STRING
        },
        updatedAt: Sequelize.DATE
      }).then(() => {
        queryInterface.addIndex('user', ['email'], {
          indexName: 'by_email',
          indicesType: 'UNIQUE'
        })
        resolve()
      }).catch((err) => {
        reject(err)
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      queryInterface.dropTable('user')
      resolve()
    })
  }
};
