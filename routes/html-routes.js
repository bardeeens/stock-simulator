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
				let transactionsArr = userObj[0].Transactions;
				console.log('UNPACKED RESPONSE', unpack(response));
				console.log('TRANSACTIONS', transactionsArr);
				// console.log('response ', response);
				let summaryArr = [];
				let position = -1;
		
				for (let i = 0; i < transactionsArr.length; i++) {
					if (position === -1 || 
					transactionsArr[i].Stock.id !== summaryArr[position].id) {
						// console.log('POSITION ', position);
						// console.log('SUMMARY TRANSACTION AT CURRENT POSTIION ', summaryArr[position]);
						// console.log('TRANSACTION ARRAY STOCK ID ',transactionsArr[i].Stock.id);
						// if (position !== -1){
						// 	console.log('SUMMARY TRANSACTION ID', summaryArr[position].id);
						// }
						let transactionObj = {};
						transactionObj.id = transactionsArr[i].Stock.id;
						transactionObj.name = transactionsArr[i].Stock.name;
						transactionObj.symbol = transactionsArr[i].Stock.symbol;
						transactionObj.price = transactionsArr[i].Stock.price;
						transactionObj.qty = 0;
						transactionsArr.forEach (
							transaction => {
								if (transaction.Stock.name === transactionObj.name) {
									transactionObj.qty += transaction.qty
								}
							}
						);
						transactionObj.totalVal = transactionObj.qty * transactionObj.price;
						summaryArr.push (transactionObj);
						position ++;
						// console.log('POSITION AT THE END',position);
	
					
						// console.log('SUMMARY ARRAY STOCK NAME ',summaryArr[position].name);

					}
					console.log('SUMMARY ARRAY ',summaryArr);
				}
				return {
					summaryTransactions: summaryArr,
					userInfo: userObj
				}
			}
		).then ( 
			(result) => {
				res.render ( "dashboard", 
					{ 
						user: result.userInfo,
						transactions: result.summaryTransactions
					}
				)
				console.log('RESULTS', result.userInfo, result.summaryTransactions);
			}
  		)
	}
)


  app.get("/transaction", (req, res) =>{
    res.render("transaction")
    // needs data
  })

};


