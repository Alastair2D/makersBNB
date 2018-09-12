'use strict'

const Browser = require('zombie');

Browser.localhost('localhost', 3000)

describe('View all listings features', function() {

  // beforeEach(function () {
    const browser = new Browser()
  // })

  describe('/', function() {
    it('gets there and responds', function () {
      browser.visit('/', function() {
        console.log(browser.location.href)
        browser.assert.success();
      })
    })
    it('displays Welcome to MakersBNB', function() {
      browser.visit('/', function() {
        browser.assert.text('Welcome to MakersBNB');
      })
    })
    it('has a SEARCH button', function() {
      browser.visit('/', function() {
        browser.assert.button('Search')
      })
    })
    it('clicking Search button takes user to /homepage', function() {
      browser.visit('/', function() {
      browser.pressButton('Search!', done);
      browser.assert.success();
      })
    })
  })

  describe('/homepage', function() {
    it('displays a listed property', function() {
      browser.visit('/homepage', function () {
      browser.assert.text('London');
      })
    })
    it('clicking Add Listing button takes user to /homepage/add', function() { 
      browser.visit('/homepage', function () {
      browser.pressButton('Add Listing!', done);
      browser.assert.page('http://localhost:3000/homepage/add'); 
    })
  })
    it('clicking Book on a property takes you to /makeBooking', function () {
      browser.visit('/homepage', function () {
      browser.pressButton('Book', done);
      // browser.assert.page('http://localhost:3000/makeBooking');
      browser.assert.url({ pathname: 'http://localhost:3000/makeBooking' });
    })
  })
})

  describe('/createListing', function () {
    it('displays correct h4 header', function () {
      browser.visit('/homepage', function () {
      browser.pressButton('Add Listing!', done);
        browser.assert.text('Add a property')
      })
    })
    it('displays the form', function () {
      browser.visit('/createListing', function () {
        browser
          .fill('Name', 'Johnny English')
          .fill('Description', 'Lush spy pad with secret weapons')
          .fill('Price', '£1')
          .pressButton('Submit', done)
            browser.assert.page('http://localhost:3000/homepage');
      })   
    })
  })



});
