module.exports = function(sequelize, DataTypes) {
    var Stock = sequelize.define("Stock", {
      // The email cannot be null, and must be a proper email before creation
      stockName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      }

    });
    return Stock;
  }