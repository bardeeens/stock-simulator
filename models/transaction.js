
module.exports = function(sequelize, DataTypes) {
	var Transaction = sequelize.define("Transaction", 
		{
			type: {
			type: DataTypes.STRING,
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
			totalPurchaseValue: {
			type: DataTypes.DECIMAL (10,2),
			allowNull: true,
			},
			totalCurrentValue: {
			type: DataTypes.DECIMAL (10,2),
			allowNull: true
			}
		}
	)
	Transaction.associate = function(models) {
		Transaction.belongsTo(models.User, 
			{ foreignKey: { allowNull: false } } 
		);
	}

	Transaction.associate = function(models) {
		Transaction.belongsTo(models.Stock, 
			{ foreignKey: { allowNull: false } } 
		);
	}

    return Transaction;
}