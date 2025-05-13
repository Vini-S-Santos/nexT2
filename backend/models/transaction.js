module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Transaction", {
    description: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    points: DataTypes.INTEGER,
    value: DataTypes.FLOAT,
    status: DataTypes.STRING,
  });
};
