var db = require("../models");
require('dotenv').config();
let axios = require('axios');
const { sequelize } = require("../models");
let stockList = "AAPL,MSFT,AMZN,GOOGL,TSLA,FB,BABA,TSM,V,JNJ,JPM,WMT,NVDA,PYPL,DIS,MA,GME,PG,UNH,HD,BAC,INTC,ASML,NFLX,CMCSA,PDD,ADBE,ABT,TM,VZ,NKE,CRM,KO,XOM,NVS,T,TMO,CSCO,LLY,AVGO,PFE,MRK,ORCL,PEP,ABBV,CVX,SHOP,DHR,ACN,QCOM";
let apiKey = process.env.APIKEY;
let unpack = (data) => JSON.parse(JSON.stringify(data));

module.exports = function(app) {
      

	app.post("/api/buy", 									
		function(request, response) {
			db.Transaction.create(request.body)
			.then (
				function( result ) {
					let newResult = unpack(result);
					db.User.increment (
						{ currentBalance: -newResult.totalValue }, 
						{ where: { id: newResult.UserId } }
					);
					return newResult;
				}
			)
			.then (										
				( result ) => {
					response.json(result);
				}
			)
		}
	)

	app.post("/api/stocks", 
		function(req, res) {
			axios.get(
				`https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`
			).then(
				function (response) {
					db.Stock.bulkCreate(response.data)
					.then(
						function(result) {
							res.json(result)
						}	
					).catch (
						(err) => console.log('HERE IS THE ERROR!!!!!!!!!!!!!!!!!!!',err)
					)
				}
			);
		}
	);

	app.put("/api/stocks", 
		function(req, res) {
			axios.get(
				`https://financialmodelingprep.com/api/v3/quote/${stockList}?apikey=${apiKey}`
			).then(
				function (result) {
					let stockObj = {};
					for (let i = 0; i < result.data.length; i++) {
						stockObj[`${i}`] = result.data[i]
					}
					for (let i = 0; i < result.data.length; i++) {
						db.Stock.update(
							{ price: stockObj[`${i}`].price,
							changesPercentage: stockObj[`${i}`].changesPercentage,
							change: stockObj[`${i}`].change,
							dayLow: stockObj[`${i}`].dayLow,
							dayHigh: stockObj[`${i}`].dayHigh,
							yearHigh: stockObj[`${i}`].yearHigh,
							yearLow: stockObj[`${i}`].yearLow,
							marketCap: stockObj[`${i}`].marketCap,
							priceAvg50: stockObj[`${i}`].priceAvg50,
							priceAvg200: stockObj[`${i}`].priceAvg200,
							volume: stockObj[`${i}`].volume,
							avgVolume: stockObj[`${i}`].avgVolume,
							exchange: stockObj[`${i}`].exchange,
							open: stockObj[`${i}`].open,
							previousClose: stockObj[`${i}`].previousClose,
							eps: stockObj[`${i}`].eps,
							pe: stockObj[`${i}`].pe,
							earningsAnnouncement: stockObj[`${i}`].earningsAnnouncement,
							sharesOutstanding: stockObj[`${i}`].sharesOutstanding,
							timestamp: stockObj[`${i}`].timestamp,
						},
							{where: { id:i+1} }
						).then ((result) => {
						}
						).catch ( (err)=> console.log(err))
					}
				}
			).then(
				function (result){
					res.send("stocks updated");
				}
			)
		}
	)

	app.post("/api/user", function(req, res) {

				db.User.create(req.body)
				.then(
					function(result) {
							res.json(result);
					}     
				);
		} 
	);

	app.get("/api/user", function(req, res) {

			db.User.findAll()
			.then(
				function(result) {
						res.json(result);
				}     
			);
		} 
	);

	app.get("/api/stocks", function(req, res) {
			db.Stock.findAll()
			.then(
				function(result) {
						res.json(result);
				}     
			);
		} 
	);

	app.get("/api/singleStock/:id", function(req, res) {

		let stockId = req.params.id
			db.Stock.findAll ( ( { where: { id: stockId } } ) )
			.then(
				(result) => {
						res.json(result);
				}
  
			);
		} 
	);

	app.post("/api/sell", 									
	function(request, response) {
		db.Transaction.create(request.body)
		.then (
			(result) => {
				response.json(result);
				return result;
			}
		).then (										
			( { UserId, totalValue } ) => {
				db.User.increment (
					{ currentBalance: -totalValue}, 
					{ where: { id: UserId } }
				);
			}
		).then (
			(result) => {
				response.json (result);
			}
		)
	}
	);
  
}