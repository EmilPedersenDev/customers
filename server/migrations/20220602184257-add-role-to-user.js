"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "role", Sequelize.STRING);
  },

  async down(queryInterface) {
    return queryInterface.removeColumn("Users", "role");
  },
};
