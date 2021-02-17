var db = require("../models");
let axios = require('axios');
let stockList = "AAPL,MSFT,AMZN,GOOGL,TSLA,FB,BABA,TSM,V,JNJ,JPM,WMT,NVDA,PYPL,DIS,MA,GME,PG,UNH,HD,BAC,INTC,ASML,NFLX,CMCSA,PDD,ADBE,ABT,TM,VZ,NKE,CRM,KO,XOM,NVS,T,TMO,CSCO,LLY,AVGO,PFE,MRK,ORCL,PEP,ABBV,CVX,SHOP,DHR,ACN,QCOM";
let apiKey = "e4c3802b17d8e6960e1ea266d24d68d6";

module.exports = function(app) {
      

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

	app.post("/api/stocks", 
		function(req, res) {
			axios.get(
				`https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`
			).then(
				function (response) {
					db.Stock.bulkCreate(response.data)
					.then(
						function(result) {
							// console.log(result);
							res.json(result)
						}	
					).catch (
						(err) => console.log('HERE IS THE ERROR!!!!!!!!!!!!!!!!!!!',err)
					)
				}
			);
		}
	);

	app.delete("/api/stocks", 
		function(req, res) {
			console.log('DELETE STOCKS ROUTE HIT!!!!!!!!!!!!!!!!!!!!!!!!!');
			db.Stock.destroy(
				{
					where: {},
					truncate: true
				}
			).then(
				function (result){
					console.log("INFO DELETED !!!!!!!!!!!!!!!!!!!!!!!!!!");
					res.json(result);
				}
			)
		}
	);

	app.put("/api/stocks", 
		function(req, res) {
			// let ids = [1,50];
			axios.get(
				`https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`
			).then(
				function (result) {
					console.log('RESULT FROM PUT REQUEST ', result.data);
					db.Stock.bulkCreate(result.data, {updateOnDuplicate : true })
					.then(
						function (result){
							res.send("stocks updated");
							console.log('STOCKS PUT API HIT AND STOCKS UPDATED!!!!!!!!!!!!!!!!!!!!!');
						}
					)
				}
			);
		}
	)

	app.post("/api/user", function(req, res) {
			// console.log("api/user route hit !!!!!!!!!!!!!!!!!");
		console.log(req.body);
				db.User.create(req.body)
				.then(
					function(result) {
							// console.log("New user created " , result);
							res.json(result);
					}     
				);
		} 
	);

	app.get("/api/user", function(req, res) {
		// console.log("api/user route hit !!!!!!!!!!!!!!!!!");
	console.log(req.body);
			db.User.findAll()
			.then(
				function(result) {
						// console.log("New user created " , result);
						res.json(result);
				}     
			);
	} 
);

	
	
	app.put("/api/sell/:id",
		function (request, response) {
			// console.log('SELL ROUTE HIT !!!!!!!!!!!!', request.params);
			db.Transaction.update( 
				{ type: "sell" }, 
				{ where: { id: request.params.id } }
			).then (
				(result) => {
					console.log(result);
					// res.json needed

				}
			)
		})

  }

