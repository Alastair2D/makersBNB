'use strict'

describe('View all listings features', function() {

  // beforeEach(function () {
  //   var list = new List();
  // })

  describe('/', function() {
    it('responds with string: Hello World!, function () {
      visit('/')
      // expect(page).to have_content 'Hello World!'
      page.should have_content 'Hello World!'
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
