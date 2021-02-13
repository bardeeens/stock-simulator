
module.exports = function(sequelize, DataTypes) {
    var Transactions = sequelize.define("Transactions", 
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
            datePurchased: {
            type: DataTypes.DATE,
            allowNull: false,
            },
            dateSold: {
            type: DataTypes.DATE,
            allowNull: true,
            },
            purachseDateValue: {
            type: DataTypes.DECIMAL (10,2),
            allowNull: true,
            },
            password: {
            type: DataTypes.STRING,
            allowNull: false
            }
        }
    )
}