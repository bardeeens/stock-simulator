var db = require("../models");
var router = require('express').Router();
var path = require("path");
let unpack = (data) => JSON.parse(JSON.stringify(data));

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", (req, res) =>{
    res.render("index")
    // data needed-user list
  })
  

  app.get("/market", (req, res) =>{
    db.Stock.findAll().then(response => {
      res.render("market", { stock: unpack(response) })
  })
  })

  app.get("/dashboard/", (req, res) =>{
    res.render("dashboard")
    // needs user information
  })

  app.get("/transaction", (req, res) =>{
    res.render("transaction")
    // needs data
  })

};


