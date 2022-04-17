'use strict';
const {
  COMENTARY_TABLE,
  ComentarySchema,
} = require('../models/comentary.model');
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(COMENTARY_TABLE, ComentarySchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(COMENTARY_TABLE);
  },
};

