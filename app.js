const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session')

//______Tell Controller how to apply CSS files______
app.use(express.static('public'))

//____Authentication with Mongoose___
const mongoose = require('mongoose')

// _______USER SCHEMA _______
var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

var ListingSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  hostId: String
});

var BookingSchema = new mongoose.Schema({
  fromDate: String, 
  toDate: String, 
  numberOfGuests: Number,
  listingId: String, 
  guestId: String
});

var User = mongoose.model('User', UserSchema);
var Listing = mongoose.model('Listing', ListingSchema);
var Booking = mongoose.model('Booking', BookingSchema);

module.exports = User;
module.exports = Listing;
module.exports = Booking;

UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) { return next(err); }
    user.password = hash;
    next();
  })
});

//_______Authentication - checks that user is _______
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

// _______ MIDDLEWARE _______
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

// ____ Establish MongoDB connection ____
var mLabDatabase = 'mongodb://makers1:makers1@ds251332.mlab.com:51332/makersbnb'
MongoClient.connect(mLabDatabase, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  db = client.db('makersbnb')
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

// ____ Establish Mongoose database connection ____
mongoose.connect(mLabDatabase);

//__________ R O U T E S __________
// One-line equivalent syntax: (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => res.render('index'));
app.get('/signup', (req, res) => res.render('signUp'));
app.get('/logIn', (req, res) => res.render('loginForm'));
app.get('/makeBooking', (req, res) => res.render('makeBooking'));
app.get('/createListing', (req, res) => res.render('createListing'));

app.get('/homepage', function (req, res) {
  db.collection('properties').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('homepage', {properties: result});
  });
});

app.post('/signUp', function (req, res) {
  if (req.body.email && req.body.password) {
    var userData = {
      email: req.body.email,
      password: req.body.password
    }
  }   
  User.create(userData, function (err, user) {
    if (err) { return console.log(err) }
    return res.redirect('/login');
  });
});

app.post('/logIn', function (req, res) {
  if (req.body.email && req.body.password) {
    UserSchema.statics.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return console.log(err)
      } else {
        var sessionData = req.session;
        sessionData.userId = user._id;
        return res.redirect('/homepage');
      }
    })
  }
});

app.post('/homepage/add', function(req, res) {
  var loggedInUser = req.session.userId;
  if (req.body.name && req.body.description && req.body.price ) {
    var listingData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      hostId: loggedInUser 
    }
  }   
  Listing.create(listingData, function (err, user) {
    if (err) { 
      return console.log(err) 
    } else {
      return res.redirect('/homepage');
    }
  })
});

app.post('/bookings/add', function(req, res) {
  var loggedInUser = req.session.userId;
  if (req.body.fromDate && req.body.toDate && req.body.numberOfGuests ) {
    var bookingData = {
      fromDate: req.body.fromDate, 
      toDate: req.body.toDate, 
      numberOfGuests: req.body.numberOfGuests,
      guestId: loggedInUser,
      // listingId: 
    }
  }   
  Booking.create(bookingData, function (err, user) {
    if (err) { 
      return console.log(err) 
    } else {
      return res.redirect('/homepage');
    }
  })
});

