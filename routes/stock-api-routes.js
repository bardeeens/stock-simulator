var db = require("../models");
let axios = require('axios');
let stockList = "AAPL,MSFT,AMZN,GOOGL,TSLA,FB,BABA,TSM,V,JNJ,JPM,WMT,NVDA,PYPL,DIS,MA,GME,PG,UNH,HD,BAC,INTC,ASML,NFLX,CMCSA,PDD,ADBE,ABT,TM,VZ,NKE,CRM,KO,XOM,NVS,T,TMO,CSCO,LLY,AVGO,PFE,MRK,ORCL,PEP,ABBV,CVX,SHOP,DHR,ACN,QCOM";
let apiKey = "e4c3802b17d8e6960e1ea266d24d68d6";

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
	axios.get(`https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`).then(function (response) {
		// let stockNameArray = [];
		// let stockSymbolArray = [];
		// let stockPriceArray = [];
		// let stockObj = {
		// 	name: [],
		// 	symbol: [],
		// 	price: []
		// }
		// for (let i = 0; i < response.data.length; i++) {
				  
		// 		  stockNameArray.push(response.data[i].name);
		// 		  stockSymbolArray.push(response.data[i].symbol);
		// 		  stockPriceArray.push(response.data[i].price);
				  
		// 		} 
				// stockObj.name.push(stockNameArray)
				// stockObj.symbol.push(stockSymbolArray)
				// stockObj.price.push(stockPriceArray)
				// console.log(stockObj);
				db.Stock.bulkCreate(response.data).then(function(result) {
					console.log(result);
					console.log("ballsacks");
					res.json(result)
				})
	//   db.Stocks.getOne().then(function(result){
	// 	if(result){
	// 		//   update by id
	// 	  } else {
	// 		db.Stock.create(req.body).then(function(result) {
	// 			console.log("asdf" , result);
	// 			res.json(result);
	// 		  });
	// 	  }
	//   })
	  
    
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

  });
}
