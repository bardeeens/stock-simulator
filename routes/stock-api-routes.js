var db = require("../models");

module.exports = function(app) {
      app.get("/api/stocks", function(req, res) {
            db.Stock.findAll({}).then(function(dbStock) {
                  console.log("Hello"+ dbStock);
                  res.json(dbStock);
            });
      });

	app.post("/api/buy", 
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
						{ currentBalance: -totalValue },  //??????????how to add to an existing value
						{ where: { id: fkUserId } }
					);
					// console.log('VARIABLES!!!!!!!!!!!!!!!!!!', fkUserId, totalValue);
					// Model.increment(
					// 	{ seq: +5 },
					// 	{ where: { id: 4 } }
					//   );
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
