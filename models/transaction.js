
module.exports = function(sequelize, DataTypes) {
	var Transaction = sequelize.define("Transaction", 
		{
			qty: {
			type: DataTypes.DECIMAL(10,2),
			allowNull: false,
			},
			price: {
			type: DataTypes.DECIMAL (10,5),
			allowNull: false,
			},
			totalValue: {
			type: DataTypes.DECIMAL (10,5),
			allowNull: true,
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