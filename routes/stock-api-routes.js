var db = require("../models");

module.exports = function(app) {
  app.get("/api/stocks", function(req, res) {
    db.Stock.findAll({}).then(function(dbStock) {
      console.log("Hello"+ dbStock);
      res.json(dbStock);
  
  });
  });

	app.post("/api/buy", 
		function(req, res) {
			let qtyPurchased = body.req.qty
			let transactionData = {									//an oject to create the transaction row
				fkUserId: req. body.userId,
				fkStockId: req.bod.stockId,
				qtyPurchased: req.bod.qty,
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

  app.post("/api/stocks", function(req, res) {
    db.Stock.create(req.body).then(function(result) {
      console.log("asdf" , result);
      res.json(result);
    });
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
};
