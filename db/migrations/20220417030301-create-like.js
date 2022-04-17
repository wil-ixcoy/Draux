'use strict';
const {LIKE_TABLE, LikeSchema} = require('../models/like.model');
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(LIKE_TABLE, LikeSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(LIKE_TABLE);
  }
};
