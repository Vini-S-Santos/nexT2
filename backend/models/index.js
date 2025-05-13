const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user")(sequelize, Sequelize);
const Transaction = require("./transaction")(sequelize, Sequelize);
User.hasMany(Transaction);
Transaction.belongsTo(User);
module.exports = { sequelize, User, Transaction };
