'use strict';
const {
  UserComentarySchema,
  USER_COMENTARY_TABLE,
} = require('../models/userComentaryLike.model');
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_COMENTARY_TABLE, UserComentarySchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_COMENTARY_TABLE);
  },
};
