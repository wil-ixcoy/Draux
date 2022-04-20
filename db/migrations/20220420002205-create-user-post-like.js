'use strict';
const {
  UserPostSchema,
  USER_POST_TABLE,
} = require('../models/userPostLike.model');
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_POST_TABLE, UserPostSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_POST_TABLE);
  },
};
