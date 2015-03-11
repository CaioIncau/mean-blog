function extraiContato(req){

module.exports = function (app) {
  var Post = app.models.post;
  var controller = {};
  controller.listaPosts = function(req, res) {
    var promise = Post.find().exec();
    promise.then(
      function(posts) {
        res.json(posts);
      },
      function(erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.salvaPost = function(req, res) {
      Post.create(req.body)
      .then(
        function(post) {
          res.status(201).json(post);
        },
        function(erro) {
          console.log(erro);res.status(500).json(erro);
        }
      );
    }
  };
  return controller;
};