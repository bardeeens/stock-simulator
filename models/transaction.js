
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
            dateSold: {
            type: DataTypes.DATE,
            allowNull: true,
            },
            purchaseDateValue: {
            type: DataTypes.DECIMAL (10,2),
            allowNull: true,
            }
        }
    )
    return Transaction;
}