module.exports = {

    after(browser, done) {
        browser.end(() => {
          console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
          console.info('*-- Clossing session... Good bye! --*');
          console.info('*--*--*--*--*--*--*--*--*--*--*--*--*');
          done();
        });
      },

    'Logged out user display Jumbotron': function(browser) {
        browser.url("http://localhost:3000")
        .waitForElementVisible('#root > div > main > div > div > div', 5000)
        .pause(1000)
        .assert.containsText('#root > div > main > div > div > div > div > p', "Some Text here")
        .assert.containsText('#navbarCollapse > ul > li:nth-child(1) > a', 'Login')
        .assert.containsText('#navbarCollapse > ul > li:nth-child(2) > a', 'Register')
    },

    'Login assert sidebar is Menu': function(browser) {
        browser
        .waitForElementVisible('#loginBtn', 5000)
        .pause(1000)
        .click('#loginBtn')
        .pause(1000)
        .waitForElementVisible('#root > div > main > div > form', 5000)
        .setValue('#root > div > main > div > form > input:nth-child(2)', 'r@rabbit.com')
        .setValue('#root > div > main > div > form > input:nth-child(3)', 'test')
        .click('#root > div > main > div > form > button')
        .pause(1000)
        .waitForElementVisible('#root > div > main > div > div > div > div > div', 5000)
        .click('#root > div > main > div > div > div > div > div > div > div.sc-bBHHxi.hoQrBb > div')
        .assert.containsText('#root > div > main > div > div > div > div > div > div > div.sc-bBHHxi.hoQrBb > div > span.head-text > p', "Menu")
        .assert.containsText('#navbarCollapse > ul > li > a', 'Logout')
    },

    'Assert Dashboard displays bookings': function(browser) {
        browser
        .click('#root > div > main > div > div > div > div > div > div > div.sc-bBHHxi.hoQrBb > div > span.icon-suffix > i')
        .click('#root > div > main > div > div > div > div > div > div > div.sc-dPiLbb.jxoZcd.pro-sidebar-content.sidebar-content > nav > ul > a:nth-child(1) > li > div')
        .pause(1000)
        .expect.element('#root > div > main > div > div.bookings > table').to.be.visible
    },

    'Assert Available Slots are displayed': function(browser){
        browser
        .click('#root > div > main > div > div:nth-child(1) > div > div > div > div.sc-dPiLbb.jxoZcd.pro-sidebar-content.sidebar-content > nav > ul > a:nth-child(2) > li')
        .pause(1000)
        .expect.element('#root > div > main > div > div.slots > table').to.be.visible
        
    },

    'After Logout display correct navigation': function(browser){
        browser
        .click('#navbarCollapse > ul > li > a')
        .pause(1000)
        .assert.containsText('#root > div > main > div > div > div > div > p', "Some Text here")
        .assert.containsText('#navbarCollapse > ul > li:nth-child(1) > a', 'Login')
        .assert.containsText('#navbarCollapse > ul > li:nth-child(2) > a', 'Register')
    },

    'Failed Login assert error message is invalid datails': function(browser) {
        browser
        .waitForElementVisible('#loginBtn', 5000)
        .pause(1000)
        .click('#loginBtn')
        .pause(1000)
        .waitForElementVisible('#root > div > main > div > form', 5000)
        .setValue('#root > div > main > div > form > input:nth-child(2)', 'error')
        .setValue('#root > div > main > div > form > input:nth-child(3)', 'error')
        .click('#root > div > main > div > form > button')
        .pause(1000)
        .waitForElementVisible('#root > div > main > div > form > p', 5000)
        .assert.containsText('#root > div > main > div > form > p', "invalid datails")
    },


}