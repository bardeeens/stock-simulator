// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
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
  })

  // app.get("/", function(req, res) {
  //   res.sendFile(path.join(__dirname, "./"));
  // });

  // cms route loads cms.html
  // app.get("/cms", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/cms.html"));
  // });

  // blog route loads blog.html
  // app.get("/blog", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // authors route loads author-manager.html
  // app.get("/authors", function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });

};
