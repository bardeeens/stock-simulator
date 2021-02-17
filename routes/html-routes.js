var db = require("../models");
var router = require('express').Router();
var path = require("path");
// const { where } = require("sequelize/types");
let unpack = (data) => JSON.parse(JSON.stringify(data));

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
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

  app.get("/dashboard/:id", 			// renders dashboard with user information and transactions summarized by company
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
				// console.log('USER OBJECT ', userObj);
				let summaryArr = [];
				let position = -1;
				for (let i = 0; i < transArr.length; i++) {
					if (position === -1 || 
					transArr[i].Stock.id !== summaryArr[position].id) {
						let obj = {};
						obj.id = transArr[i].Stock.id;
						obj.name = transArr[i].Stock.name;
						obj.symbol = transArr[i].Stock.symbol;
						obj.price = transArr[i].Stock.price;
						obj.qty = 0;
						transArr.forEach (
							transaction => {
								if (transaction.Stock.name === obj.name) {
									obj.qty += transaction.qty
								}
							}
						);
						obj.totalVal = obj.qty * obj.price;
						summaryArr.push (obj);
						position ++;
					}
				}
				let totStockVal = 0
				for (let i = 0; i < summaryArr.length; i++) {
					totStockVal += summaryArr[i].qty * summaryArr[i].price;
				}
				let netWorth = totStockVal + parseInt(userObj[0].currentBalance)
				console.log('USER CURRENT BALANCE ', userObj[0].currentBalance);
				console.log('TOTAL STOCK VALUE ', totStockVal);
				return {
					transSummary: summaryArr,
					userInfo: userObj,
					totalStocksValue: totStockVal,
					net: netWorth
				}
			}
		).then ( 
			(result) => {
				res.render ( "dashboard", 
					{ 
						user: result.userInfo,
						transactions: result.transSummary,
						totals: {
							stocks: result.totalStocksValue,
							netWorth: result.net
						}
					}
				);
				// console.log('TOTAL VALUE ', result.totalStocksValue);
			}
  		)
	}
)


  app.get("/transaction", (req, res) =>{
    res.render("transaction")
    // needs data
  })

};


