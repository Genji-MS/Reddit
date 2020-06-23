const Post = require('../models/post');

module.exports = app => {
    // CREATE
    app.post("/post/new", async (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = await new Post(req.body);
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });
  };