var db = require("../models");
var router = require('express').Router();
var path = require("path");
let unpack = (data) => JSON.parse(JSON.stringify(data));

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", (req, res) =>{
    db.User.findAll().then(response => {
      res.render("index", { user: unpack(response) })
  })
  })
  

  app.get("/market", (req, res) =>{
    db.Stock.findAll().then(response => {
      res.render("market", { stock: unpack(response) })
  })
  })

  app.get("/dashboard/:id", 			
	(req, res) => {
		db.User.findAll (
			{ 
				where: { id: [req.params.id] },
				include: [ 
					{ 
						model: db.Transaction, 
						include: [ { model: db.Stock } ],
						group: [ db.Transaction.StockId ]
					}
				]
			}
		).then ( 
			(response) => {
				let userObj = unpack(response);
				let transArr = userObj[0].Transactions;
				console.log('TRANSACTIONS ARR ', userObj[0].Transactions);
				let summaryArr = [];
				let position = -1;
				let summaryIds = [];
				for (let i = 0; i < transArr.length; i++) {
					if ( !summaryIds.includes ( transArr[i].Stock.id ) ) {
						console.log('ID OF STOCK BEING BUILT',transArr[i].Stock.id);
						let obj = {};
						obj.id = transArr[i].Stock.id;
						obj.name = transArr[i].Stock.name;
						obj.symbol = transArr[i].Stock.symbol;
						obj.price = transArr[i].Stock.price;
						obj.qty = 0;
						transArr.forEach (
							transaction => {
								if (transaction.Stock.name === obj.name) {
									obj.qty += parseFloat(transaction.qty)
								}
							}
						);
						obj.totalVal = obj.qty * obj.price;
						if (obj.qty !== 0){
							summaryArr.push (obj);
						}
							summaryIds.push(obj.id);
						position ++;
					}
				}
				let totStockVal = 0
				for (let i = 0; i < summaryArr.length; i++) {
					totStockVal += summaryArr[i].qty * summaryArr[i].price;
				}
<<<<<<< HEAD
				let netWorth = totStockVal + parseInt(userObj[0].currentBalance)
=======
				let netWorth = totStockVal + parseFloat(userObj[0].currentBalance)
				// console.log('USER CURRENT BALANCE ', userObj[0].currentBalance);
				// console.log('TOTAL STOCK VALUE ', totStockVal);
				console.log('USER OBJECT !!!!!!!!!!!!!!!!!!!!!!!!!',userObj);
>>>>>>> bd13391590d39f8ab8a48a6e4b1a8b82498faff2
				return {
					transSummary: summaryArr,
					userInfo: userObj,
					totalStocksValue: totStockVal,
					net: netWorth
				}
			}
		).then ( 
			(result) => {
<<<<<<< HEAD
=======
				// console.log('USER INFO !!!!!!!!!!!!!!!!!!!!!!!!!',result.userInfo);
				// console.log('PRICE!!!!!!!!!!!!!!!!!!',result.transSummary[0].price.toFixed(2));
>>>>>>> bd13391590d39f8ab8a48a6e4b1a8b82498faff2
				res.render ( "dashboard", 
					{ 
						user: result.userInfo[0],
						transactions: result.transSummary,
						totals: {
							holdings: result.totalStocksValue.toFixed(2),
							netWorth: result.net.toFixed(2)
						}
					}
				);
			}
  		)
	}
)


	app.get("/transactions/:id", 
		(req, res) => {
			let id = req.params.id
			db.Transaction.findAll (
				{ 
					where: { UserId: [req.params.id] },
					include: [ 
						{ 
							model: db.Stock, 
						}
					]
				}
			).then(
				response => {
					res.render("transaction", { transactions: unpack(response) })
				}
			)
		}
  	)
};


