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
					{ model: db.Transaction, 
						include: [ { model: db.Stock } ] 
					} 
				]
			}
		).then ( 
			(response) => {
				let userObj = unpack(response);
				let transactionsArr = userObj[0].Transactions;
				console.log('UNPACKED RESPONSE', unpack(response));
				console.log('TRANSACTIONS', transactionsArr);
				console.log('STOCK', transactionsArr[3].Stock);
				console.log('STOCK NAME ', transactionsArr[3].Stock.name);
				res.render ( "dashboard", 
					{ 
						user: userObj,
						transactions: transactionsArr
					 }
					// { user: unpack(response) }
				)
			}
		)
	}
  )



  app.get("/transaction", (req, res) =>{
    res.render("transaction")
    // needs data
  })

};


