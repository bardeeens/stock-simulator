
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", 
        {
            userName: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            currentBalance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
			defaultValue: 1000
            },
            totalHoldings: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
			defaultValue: 1000
            },
            beginingInvestmentAmount: {
            type: DataTypes.DECIMAL (10,2),
            allowNull: false,
			defaultValue: 1000
            }
        }
    )
    return User;
}