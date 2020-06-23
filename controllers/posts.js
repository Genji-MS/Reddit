const Post = require('../models/post');

module.exports = app => {
    // INDEX
    app.get('/', (req, res) => {
        Post.find({}).lean()
            .then(posts => {
                res.render("posts_index", { posts });
            })
            .catch(err => {
                console.log(err.message);
        });
    });

    // CREATE
    app.post("/posts/new", async (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = await new Post(req.body);
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });

    // GET ONE
    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id)
          .then(post => {
            res.render("posts_show", { post });
          })
          .catch(err => {
            console.log(err.message);
          });
    });
};


// Post.find({}).lean()
//     .then(posts => {
//         res.render("posts_index", { posts });
// })
//     .catch(err => {
//     console.log(err.message);
// });