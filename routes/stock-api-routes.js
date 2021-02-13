var db = require("../models");

module.exports = function(app) {
  app.get("/api/authors", function(req, res) {
    // 1. Add a join to include all of each Author's Posts
    // db.Author.findAll({}).then(function(dbAuthor) {
    //   res.json(dbAuthor);
    // });
  });

  app.post("/api/buy/:id", function(req, res) {
    db.Transaction.create(req.body).then(function(transaction) {
      res.json(dbAuthor);
    });
  });

  app.post("/api/authors", function(req, res) {
    // db.Author.create(req.body).then(function(dbAuthor) {
    //   res.json(dbAuthor);
    // });
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
