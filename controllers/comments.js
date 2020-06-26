const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

// Braus' fix to remove redundant .then. But not working?
// module.exports = function(app) {
//     // CREATE Comment
//     app.post("/posts/:postId/comments", function(req, res) {
//     // INSTANTIATE INSTANCE OF MODEL
//         var currentUser = req.user;
        
//         const comment = new Comment(req.body);
//         comment.author = req.user._id;
//         comment
//             .save()
//             .then(comment => { 
//                 const post = Post.findById(req.params.postId);
//                 post.comments.unshift(comment);
//                 post.save();
//                 return res.redirect(`/posts/${req.params.postId}`);
//             })
//             .catch(err => {
//             console.log(err);
//             });
//     });
// };

// tutorial version
module.exports = function (app) {
    // CREATE Comment
    app.post("/posts/:postId/comments", function (req, res) {
      const comment = new Comment(req.body);
      comment.author = req.user._id;
      comment
          .save()
          .then(comment => {
              return Promise.all([
                  Post.findById(req.params.postId)
              ]);
          })
          .then(([post, user]) => {
              post.comments.unshift(comment);
              return Promise.all([
                  post.save()
              ]);
          })
          .then(post => {
              res.redirect(`/posts/${req.params.postId}`);
          })
          .catch(err => {
              console.log(err);
          });
  });
};