module.exports = function(sequelize, DataTypes) {
    var Stock = sequelize.define("Stock", {
      // The email cannot be null, and must be a proper email before creation
      name: {
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
        type: DataTypes.DECIMAL(10,5),
        allowNull: false
      },
      changesPercentage: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true
      },
      change: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: true
      },
      dayLow: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
      dayHigh: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
      yearHigh: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
      yearLow: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
      marketCap: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
      },
      priceAvg50: {
        type: DataTypes.DECIMAL(15,3),
        allowNull: true
      },
      priceAvg200: {
        type: DataTypes.DECIMAL(15,3),
        allowNull: true
      },
      volume: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      avgVolume: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      exchange: {
        type: DataTypes.STRING,
        allowNull: true
      },
      open: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
      },
      previousClose: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
      },
      eps: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: true
      },
      pe: {
        type: DataTypes.DECIMAL(15,3),
        allowNull: true
      },
      earningsAnnouncement: {
        type: DataTypes.STRING,
        allowNull: true
      },
      sharesOutstanding: {
        type: DataTypes.BIGINT(15),
        allowNull: true
      },
      timestamp: {
        type: DataTypes.INTEGER,
        allowNull: true
      }


    });

	Stock.associate = function(models) {
		Stock.hasMany(models.Transaction, 
			{ onDelete: "cascade" }
		);
	};

    return Stock;
  }