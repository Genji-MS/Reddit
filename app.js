// Initialize express
const express = require('express')
const app = express()
require('./controllers/post.js')(app);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//allows use of shorter extension .hbs instead of .handlebars
exphbs = require('express-handlebars'),
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Add after body parser initialization!
app.use(expressValidator());
// Set db
require('./data/reddit_db');

// Tell our app to send the "hello world" message to our home page
app.get('/', async (req, res) => {
    try{
        //events = await models.Event.findAll({ order: [['createdAt', 'DESC']] });
        events =  await {msg:'Hello World'}
        return res.render('home', { events });
    } catch (err) {
        return console.log(err);
    }
})

app.get('/post/new', async (req, res) => {
    try {
        events = ''
        return res.render('post_new', { events })
    } catch (err) {
        return console.log(err);
    }
})

app.get('/post/create'), async (req, res) => {
    try {
        return console.log('created')
    } catch (err) {
        return console.log(err);
        
    }
}

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})