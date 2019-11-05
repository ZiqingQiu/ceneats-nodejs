let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.continueOrder = async function() {
    continueOrderButton = await this.findById(locator.contiueOrderBtnId);
    await continueOrderButton.click();
    return true;
}

Page.prototype.addOrder = async function(id='1101',quantity='3') {
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

Page.prototype.getLastOrder = async function() {
    //get cols
    row_length = await this.findTableSizeByXpath(locator.tableRowXPath);
    let tableCellFoodIdXPath = "//*[@id='centerForm_C']/table/tbody/tr[" + row_length + "]/td[3]";
    food_id = await this.findTableCellTextByXPath(tableCellFoodIdXPath);
    let tableCellQuantityXPath = "//*[@id='centerForm_C']/table/tbody/tr[" + row_length + "]/td[4]";
    quantity = await this.findTableCellTextByXPath(tableCellQuantityXPath);
    return {
        food_id: food_id,
        quantity: quantity
    };
}

module.exports = Page;