'use strict';
const {FOLLOW_TABLE, FollowSchema} = require('../models/follow.model');
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(FOLLOW_TABLE, FollowSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(FOLLOW_TABLE);
  }
};


