module.exports = function (app) {
  var Post = app.models.post;
  var controller = {};

function extraiPost(req){
  var dados = {
      "title" : req.body.title,
      "text" : req.body.text,
      "private" : req.body.private || false
  };
  return dados;
}

controller.obtemPost = function(req, res) {
    var _id = req.params.id;
    Post.findById(_id).exec()
      .then(function(post) {
        if (!post) throw new Error("Post não encontrado");
          res.json(post) ;
        },
        function(erro) {
          console.log(erro);
          res.status(404).json(erro);
        }
       );
  };

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
    var _id = req.body._id;
    console.log(_id);
    if(_id) {
      console.log("cai na rota de update");
     Post.findByIdAndUpdate(_id, extraiPost(req)).exec()
       .then(
        function(post) {
          res.json(post);
        },
        function(erro) {
          res.status(500).json(erro);
        }
    );
    } else {
      post = new Post(req.body);
        Post.create(extraiPost(req))
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