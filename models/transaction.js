
module.exports = function(sequelize, DataTypes) {
      var Transaction = sequelize.define("Transaction", 
            {
				fkUserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				},
				fkStockId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				},
				qtyOwned: {
				type: DataTypes.INTEGER,
				allowNull: false,
				},
				purchasePrice: {
				type: DataTypes.DECIMAL (10,2),
				allowNull: false,
				},
				currentPrice: {
				type: DataTypes.DECIMAL (10,2),
				allowNull: false,
				},
				totalValue: {
				type: DataTypes.DECIMAL (10,2),
				allowNull: false,
				}
            }
      )
      return Transaction;
}