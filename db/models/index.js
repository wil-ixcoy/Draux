const { User, UserSchema } = require('./user.model.js');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

module.exports = { setupModels };
