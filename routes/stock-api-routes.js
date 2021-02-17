var db = require("../models");
let axios = require('axios');
const { sequelize } = require("../models");
let stockList = "AAPL,MSFT,AMZN,GOOGL,TSLA,FB,BABA,TSM,V,JNJ,JPM,WMT,NVDA,PYPL,DIS,MA,GME,PG,UNH,HD,BAC,INTC,ASML,NFLX,CMCSA,PDD,ADBE,ABT,TM,VZ,NKE,CRM,KO,XOM,NVS,T,TMO,CSCO,LLY,AVGO,PFE,MRK,ORCL,PEP,ABBV,CVX,SHOP,DHR,ACN,QCOM";
let apiKey = "e4c3802b17d8e6960e1ea266d24d68d6";
let unpack = (data) => JSON.parse(JSON.stringify(data));

module.exports = function(app) {
      

	app.post("/api/buy", 									//creates new transaction - all data needed from frontend formatted correctly as an object with propper key names
		function(request, response) {
		
		      db.Transaction.create(request.body)
			  .then (
				function(result) {
					let newResult = unpack(result);
					console.log("its working", newResult);	
					response.json(result);
					
				}
			).then (										//finds the user and decrements their balance by the transaction total value
				( { UserId, totalValue } ) => {
					console.log(totalValue);
					console.log(UserId);
					db.User.increment (
						{ currentBalance: -totalValue }, 
						{ where: { id: UserId } }
					);
				}
			)
				// .then (
	// 			(result) => {
	// 				// console.log('RESULT!!!!!!!!!!!!!!!!!', result);
	// 				response.json (result);
	// 			}
	// 		)
		}
	);

  app.post("/api/stocks", function(req, res) {
	axios.get(`https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`).then(function (response) {
		
				db.Stock.bulkCreate(response.data).then(function(result) {
					console.log(result);
					res.json(result)
				})
  });
});

	app.delete("/api/stocks", function(req, res) {
	db.Stock.destroy({where:{}}).then(function (result){
		console.log("deleted baby");
		res.send("delete successful")
	})
	});
// comeback, no new data
	app.put("/api/stocks", function(req, res) {
		let ids = [1,50]
		db.Stock.update({},{where:{id: ids}}).then(function (result){
			res.send("update successful")
		})
		});

	app.post("/api/user", function(req, res) {
			console.log("api/user route hit !!!!!!!!!!!!!!!!!");
		console.log(req.body);
				db.User.create(req.body)
				.then(
					function(result) {
							console.log("New user created " , result);
							res.json(result);
					}     
				);
		} 
	);

	app.get("/api/user", function(req, res) {
		console.log("api/user route hit !!!!!!!!!!!!!!!!!");
	console.log(req.body);
			db.User.findAll()
			.then(
				function(result) {
						console.log("New user created " , result);
						res.json(result);
				}     
			);
	} 
);

app.get("/api/stocks", function(req, res) {
	console.log("api/stocks route hit !!!!!!!!!!!!!!!!!");
console.log(req.body);
		db.Stock.findAll()
		.then(
			function(result) {
					console.log("CURRENT STOCKS " , result);
					res.json(result);
			}     
		);
} 
);

app.post("/api/sell", 									//creates new transaction - all data needed from frontend formatted correctly as an object with propper key names
function(request, response) {
	  db.Transaction.create(request.body)
	.then (
		(result) => {
			response.json(result);
			return result;
		}
	).then (										//finds the user and decrements their balance by the transaction total value
		( { UserId, totalValue } ) => {
			db.User.increment (
				{ currentBalance: -totalValue}, 
				{ where: { id: UserId } }
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
	
// Model.update({ field: sequelize.literal('field + 2') }, { where: { id: model_id } });

  }

