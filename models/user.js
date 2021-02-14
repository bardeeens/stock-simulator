
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", 
        {
            firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            currentBalance: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            },
            totalHoldings: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
            },
            beginingInvestmentAmount: {
            type: DataTypes.DECIMAL (10,2),
            allowNull: false,
            }
        }
    )
    return User;
}