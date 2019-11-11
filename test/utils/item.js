let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.clickAddOrder = async function() {
    addOrderButton = await this.findById(locator.addOrderBtnId);
    await addOrderButton.click();
    return true;
}


Page.prototype.clickAddItem = async function() {
    addItemButton = await this.findById(locator.addItemBtnId);
    await addItemButton.click();
    return true;
}


module.exports = Page;