'use strict'

const Browser = require('zombie');

Browser.localhost('localhost', 3000)

describe('View all listings features', function() {

  const browser = new Browser()

  describe('/', function() {
    it('responds with Hello World!', function () {
      browser.visit('/', function() {
        console.log(browser.location.href)
        browser.assert.success();
      })
      // expect(page).to have_content 'Hello World!'
      // page.should have_content('Hello World!')

    })
  })

  // describe('Homepage', function() {
  //   it('displays list of all properties', function () {
  //     visit('/homepage')
  //     expect(page).to have_content('')
  //     // page.should have_content 'title'
  //   })
  // })



});
