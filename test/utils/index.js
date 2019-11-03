let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.clickLogInButton = async function() {
    logInBtn = await this.findByName(locator.loginButtonClass);
    await LogInBtn.click();
}

module.exports = Page;