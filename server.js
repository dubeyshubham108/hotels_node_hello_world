
const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser');
app.use(bodyParser.json()) //req.body

const menu = require('./models/menuItem');

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/home', function (req, res) {
    res.send('Welcome to home')
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItem = require('./routes/menuRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItem);


app.listen(3000, () => {
  console.log('listening to port 3000');
})