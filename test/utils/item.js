let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.clickAddOrder = async function() {
    addOrderButton = await this.findByClassName(locator.selectBtnClassName);
    await addOrderButton.click();
    return true;
}



module.exports = Page;