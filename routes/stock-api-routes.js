var db = require("../models");

module.exports = function(app) {
      app.get("/api/stocks", function(req, res) {
            db.Stock.findAll({}).then(function(dbStock) {
                  console.log("Hello"+ dbStock);
                  res.json(dbStock);
            });
      });

	app.post("/api/buy", 									//creates new transaction - all data needed from frontend formatted correctly as an object with propper key names
		function(request, response) {
		      db.Transaction.create(request.body)
			.then (
				(result) => {
					response.json(result);
					return result;
				}
			).then (										//finds the user and decrements their balance by the transaction total value
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
