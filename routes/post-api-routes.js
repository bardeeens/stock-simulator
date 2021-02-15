// *********************************************************************************
  // https://www.npmjs.com/package/axios
  
// Requiring our models
var db = require("../models");
const axios = require('axios');
// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    res.json()
  });
    // var query = {};
    // if (req.query.author_id) {
    //   query.AuthorId = req.query.author_id;
    // }
    // // 1. Add a join here to include all of the Authors to these posts
    // db.Post.findAll({
    //   where: query
    // }).then(function(dbPost) {
    //   res.json(dbPost);
    // });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    // db.Post.findOne({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function(dbPost) {
    //   console.log(dbPost);
    //   res.json(dbPost);
    // });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    // db.Post.create(req.body).then(function(dbPost) {
    //   res.json(dbPost);
    // });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    // db.Post.destroy({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function(dbPost) {
    //   res.json(dbPost);
    // });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    // db.Post.update(
    //   req.body,
    //   {
    //     where: {
    //       id: req.body.id
    //     }
    //   }).then(function(dbPost) {
    //   res.json(dbPost);
    // });
  });
};
