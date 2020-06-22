// Initialize express
const express = require('express')
const app = express()

exphbs = require('express-handlebars'),
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

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

// Choose a port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})