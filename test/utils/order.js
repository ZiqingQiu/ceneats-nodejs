let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.continueOrder = async function() {
    continueOrderButton = await this.findById(locator.contiueOrderBtnId);
    await continueOrderButton.click();
    return true;
}

Page.prototype.addOrder = async function(id='1001',quantity='3') {
    inputFoodId = await this.findById(locator.inputFoodId);
    await this.write(inputFoodId, id);
    inputFoodQuantity = await this.findById(locator.inputQuantityId);
    await this.write(inputFoodQuantity, quantity);
    //click dropdown
    foodStatusBtn = await this.findById(locator.orderStatusDpDownId);
    await foodStatusBtn.click();
    //select dropdown
    foodStatusItem = await this.findById(locator.orderStatusDpDownItemId);
    await foodStatusItem.click();
    //submit
    submitBtn = await this.findByClassName(locator.selectBtnClassName);
    await submitBtn.click();
    return true;
}



module.exports = Page;