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

    // NEW
    app.get('/posts/new', async (req, res) => {
        try {
            return res.render('posts_new', {})
        } catch (err) {
            return console.log(err);
        }
    })

    // CREATE
    app.post("/posts/new", (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);
        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            console.log(err)
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });

    // GET ONE
    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').then((post) => {
            post = post.toObject();
            res.render('posts_show', { post })
        }).catch((err) => {
            console.log(err.message)
        });
        // Post.findById(req.params.id).then(post => {
        //     // CONVERT SINCGLE POST TO OBJECT
        //     //console.log(post);
        //     res.render("posts_show", { post });
        // }).catch(err => {
        //     console.log(err.message);
        // });
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function(req, res) {
        Post.find({ subreddit: req.params.subreddit }).then(posts => {
            // CONVERT ARRAY INTO OBJECTS
            posts = posts.map(function(posts) { return posts.toObject(); });
            //console.log(posts)
            res.render("posts_index", { posts });
        })
        .catch(err => {
            console.log(err);
        });
    });
};
