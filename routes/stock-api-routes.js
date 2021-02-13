var db = require("../models");

module.exports = function(app) {
	app.get("/api/authors", function(req, res) {
		// 1. Add a join to include all of each Author's Posts
		// db.Author.findAll({}).then(function(dbAuthor) {
		//   res.json(dbAuthor);
		// });
	});

	app.post("/api/buy", 
		function(req, res) {
			let qtyPurchased = body.req.qty
			let transactionData = {									//an oject to create the transaction row
				fkUserId: body.req.userId,
				fkStockId: body.req.stockId,
				qtyPurchased: body.req.qty,
				dateSold: "",
				purchasePrice: "",
				totalValue: ""
			}
			db.Stock.findAll(										//finds the stock to be purchased
				{
					where: {
						id: req.stock.id
					}
				}
			).then ( 												//sets transaction purchase price to current stock price
				( { price } ) => {
					transactionData.purchaseDateValue = price;		//?????????????what is the column name in the stock table?
					transactionData.totalValue = response.price * transactionData.qtyPurchased;
					return transactionData;
				}
			).then (												//creates the transaction
				(transactionData) => {
					db.Transaction.create(transactionData);
				}
			).then (												//returns the transaction creation response
				() => { 
					res.json(transactionData);
					return transactionData }
			).then (												//finds the user and decrements their balance by the transaction total value
				( { fkUserId, totalValue } ) => {
					db.Users.update(
						{ currentBalance: users.currentBalance - totalValue },  //??????????how to add to an existing value
						{ where: { id: fkUserId } }
					)
				}
			)
		}
	)

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

  axios.get('/user?ID=12345')
    .then(function (response) {
	  console.log(response);

};
