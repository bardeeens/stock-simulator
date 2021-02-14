var db = require("../models");

module.exports = function(app) {
      app.get("/api/stocks", function(req, res) {
            db.Stock.findAll({}).then(function(dbStock) {
                  console.log("Hello"+ dbStock);
                  res.json(dbStock);
            });
      });

<<<<<<< HEAD
	app.post("/api/buy", 
		function(req, res) {
			// change this to req.body
			let qtyPurchased = body.req.qty
			let transactionData = {									//an oject to create the transaction row
				fkUserId: req. body.userId,
				fkStockId: req.body.stockId,
				qtyPurchased: req.body.qty,
				dateSold: "",
				purchasePrice: "",
				totalValue: ""
			}
			db.Stock.findAll(										//finds the stock to be purchased
				{
					where: {
						id: req.body.stockId
					}
				}
			).then ( 												//sets transaction purchase price to current stock price
				( { price } ) => {
					transactionData.purchasePrice = price;		//?????????????what is the column name in the stock table?
					transactionData.totalValue = price * transactionData.qtyPurchased;
					return transactionData;
				}
			).then (												//creates the transaction
				(transactionData) => {
					return db.Transaction.create(transactionData);
				}
			).then (												//returns the transaction creation response
				() => { 
					res.json(transactionData);
					return transactionData }
			).then (												//finds the user and decrements their balance by the transaction total value - switch order
=======
	app.post("/api/buy", 									//creates new transaction - all data needed from frontend formatted correctly as an object with propper key names
		function(request, response) {
		      db.Transaction.create(request.body)
			.then (
				(result) => {
					response.json(result);
					return result;
				}
			).then (										//finds the user and decrements their balance by the transaction total value
>>>>>>> main
				( { fkUserId, totalValue } ) => {
					db.User.increment (
						{ currentBalance: -totalValue }, 
						{ where: { id: fkUserId } }
					);
				}
			).then (
				(result) => {
					// console.log('RESULT!!!!!!!!!!!!!!!!!', result);
					response.json (result);
				}
			)
		}
	);

<<<<<<< HEAD
  app.post("/api/stocks", function(req, res) {

	  db.Stocks.getOne().then(function(result){
		if(result){
			//   update by id
		  } else {
			db.Stock.create(req.body).then(function(result) {
				console.log("asdf" , result);
				res.json(result);
			  });
		  }
	  })
	  
    
  });
=======
	app.post("/api/stocks", function(req, res) {
		db.Stock.create(req.body).then(function(result) {
			console.log("asdf" , result);
			res.json(result);
		});
	});
>>>>>>> main

	app.delete("/api/authors/:id", function(req, res) {
		// db.Author.destroy({
		//   where: {
		//     id: req.params.id
		//   }
		// }).then(function(dbAuthor) {
		//   res.json(dbAuthor);
		// });
	});

//   axios.get('/user?ID=12345')
//     .then(function (response) {
// 	  console.log(response);

	app.post("/api/user", 
		function(req, res) {
				db.User.create(req.body)
				.then(
					function(result) {
							console.log("New user created " , result);
							res.json(result);
					}     
				);
		} 
	);
	app.put("/api/sell/:id",
		function (request, response) {
			console.log('SELL ROUTE HIT !!!!!!!!!!!!', request.params);
			db.Transaction.update( 
				{ type: "sell" }, 
				{ where: { id: request.params.id } }
			).then (
				(result) => {
					console.log(result);
				}
			)
		})

};
