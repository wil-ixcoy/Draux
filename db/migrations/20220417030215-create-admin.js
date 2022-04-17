'use strict';
const {ADMIN_TABLE,AdminSchema} = require('../models/admin.model');
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ADMIN_TABLE, AdminSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ADMIN_TABLE);
  }
};
