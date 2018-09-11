const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const frisby = require('frisby');

// Body parser middleware - will handle parsing json content - not sure exactly what this does!!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
// app.use(express.static(path.join(__dirname, 'public'))) -----no idea if this is necessary!

// middleware to set the view engine - setting it to use ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// creating a dummy object ( i think this is json style notation that we will parse to the browser)
// This is the kind of thing that we will retrieve from our database
// const property = {
//   name: 'London appartment',
//   description: 'a nice flat in central London',
//   price: '£100 per night'
// };

//  an example of what out property objects would look like
var properties = [
  {
    id: 1,
    name: 'London Appartment',
    description: 'A nice flat in central London',
    price: '£100 per night'
  },

  {
    id: 2,
    name: 'New York Appartment',
    description: 'A nice flat in central Manhatten',
    price: '£120 per night'
  },

  {
    id: 3,
    name: 'Tokyo Appartment',
    description: 'A nice flat in central Tokyo',
    price: '£150 per night'
  },
]


app.get('/', function (req, res) {    // One-line equivalent syntax: (req, res) => res.send('Hello World!'))
 res.send('Hello World!')
});


// parsing a dummy object containing properties through the controller - this will later come from our database
app.get('/homepage', function (req, res) {
 res.render('homepage', {
   title: 'Properties',
   properties: properties
 });
});


// thinking a post route here for the homepage
app.post('/homepage/add', function(req, res) {
  var newProperty = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  // we would need a way to push this new object up to the database
  // and then a redirect to the homepage somehow
  console.log(newProperty);
});



app.get('/makeBooking', function (req, res) {
 // res.send('This is a string return by a .get http req/res cycle to /makeBooking')
 res.render('makeBooking');
});

app.get('/createListing', function (req, res) {
 // res.send('This is another string returned from the /newListing route')
 res.render('createListing');
});




// throwing in a route to a login form if we need one later
app.get('/loginForm', function (req, res) {
  res.render('loginForm');
});




app.listen(3000, function() {
   console.log('Server started on port 3000!');
});
