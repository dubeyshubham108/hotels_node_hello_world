
const express = require('express')
const app = express()
const db = require('./db')
const bodyParser = require('body-parser');
app.use(bodyParser.json()) //req.body
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

const menu = require('./models/menuItem');
const PORT = process.env.PORT || 3000;

// Middle ware function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
  next(); //move on to the next phase
}

app.use(logRequest);

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
  //authentication logic here
  try {
    console.log('Received credentials: ', USERNAME, password);
    const user = await Person.findOne({username: USERNAME});
    if(!user) 
      return done(null, false, { message: 'Incorrect username.'});
    const isPasswordMatch = user.password == password ? true : false;
    if(isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect Password.'});
    }
    } catch (err) {
      return done(err);
  }
}))

app.use(passport.initialize())

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', localAuthMiddleware, function (req, res) {
  res.send('Welcome to one of the beautiful hotel')
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

app.listen(PORT, () => {
  console.log('listening to port 3000');
})