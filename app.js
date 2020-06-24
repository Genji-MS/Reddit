// Initialize express
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

//allows use of shorter extension .hbs instead of .handlebars
exphbs = require('express-handlebars'),
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// Use Body Parserx§
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
// Add after body parser initialization!
app.use(expressValidator());
// Set db
require('./data/reddit_db');



// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
//for testing with mocha
module.exports = app;