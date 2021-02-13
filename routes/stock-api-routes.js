var db = require("../models");

module.exports = function(app) {
  app.get("/api/authors", function(req, res) {
    // 1. Add a join to include all of each Author's Posts
    // db.Author.findAll({}).then(function(dbAuthor) {
    //   res.json(dbAuthor);
    // });
  });

  app.post("/api/buy", function(req, res) {
	let transactionData = {
		fkUserId: body.req.userId,
		fkStockId: body.req.stockId,
		qtyPurchased: body.req.qty,
		dateSold: "",
		purchaseDateValue: ""
	}
	db.Stock.findAll(
		{
			where: {
				id: req.stock.id
			}
		}
	).then ( 
		(response) => {
			transactionData.purchaseDateValue = response.value;		//what is the column name in the stock table?
			db.Transaction.create(transactionData)
			.then(
				function(transaction) {
					res.json(transaction);
				}
			)
		}
	)		
}

  app.post("/api/authors", function(req, res) {
    // db.Author.create(req.body).then(function(dbAuthor) {
    //   res.json(dbAuthor);
    // });
  });

  app.delete("/api/authors/:id", function(req, res) {
    // db.Author.destroy({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function(dbAuthor) {
    //   res.json(dbAuthor);
    // });
  });

};
