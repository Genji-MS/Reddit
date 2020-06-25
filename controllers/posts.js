const Post = require('../models/post');

module.exports = app => {
    // INDEX
    app.get('/', (req, res) => {
        var currentUser = req.user;
        Post.find({}).lean()
            .then(posts => {
                res.render("posts_index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err.message);
        });
    });

    // NEW
    app.get('/posts/new', async (req, res) => {
        var currentUser = req.user;
        try {
            return res.render('posts_new', { currentUser })
        } catch (err) {
            return console.log(err);
        }
    })

    // CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
    
            post.save(function(err, post) {
            return res.redirect(`/`);
        });
        } else {
        return res.status(401); // UNAUTHORIZED
      }
    });
    

    // GET ONE
    app.get("/posts/:id", function(req, res) {
        // LOOK UP THE POST
        var currentUser = req.user;
        Post.findById(req.params.id).populate('comments').then((post) => {
            post = post.toObject();
            res.render('posts_show', { post, currentUser })
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
        var currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).then(posts => {
            // CONVERT ARRAY INTO OBJECTS
            posts = posts.map(function(posts) { return posts.toObject(); });
            //console.log(posts)
            res.render("posts_index", { posts, currentUser });
        })
        .catch(err => {
            console.log(err);
        });
    });
};
