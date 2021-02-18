
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", 
        {
            userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
            },
            currentBalance: {
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

	User.associate = function(models) {
		User.hasMany(models.Transaction, 
			{ onDelete: "cascade" }
		);
	};

    return User;
}