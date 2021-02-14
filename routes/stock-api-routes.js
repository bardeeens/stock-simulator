var db = require("../models");

module.exports = function(app) {
  app.get("/api/stocks", function(req, res) {
    db.Stock.findAll({}).then(function(dbStock) {
      console.log("Hello"+ dbStock);
      res.json(dbStock);
  
  });
  });

  app.get("/api/authors/:id", function(req, res) {
    // 2; Add a join to include all of the Author's Posts here
    // db.Author.findOne({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function(dbAuthor) {
    //   res.json(dbAuthor);
    // });
  });

  app.post("/api/stocks", function(req, res) {
    db.Stock.create(req.body).then(function(result) {
      console.log("asdf" , result);
      res.json(result);
    });
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

};
