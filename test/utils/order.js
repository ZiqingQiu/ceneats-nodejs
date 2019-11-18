let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.continueOrder = async function() {
    continueOrderButton = await this.findById(locator.contiueOrderBtnId);
    await continueOrderButton.click();
    return true;
}

Page.prototype.inputOrder = async function(id='1101',quantity='3') {
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
    //get total row count
    row_length = await this.findTableSizeByXpath(locator.tableRowXPath);
    //build xpath for food id ele
    let tableCellFoodIdXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[3]";
    food_id = await this.findTableCellTextByXPath(tableCellFoodIdXPath);
    //build xpath for quantity ele
    let tableCellQuantityXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[4]";
    quantity = await this.findTableCellTextByXPath(tableCellQuantityXPath);
    //console.log('dbg ' + row_length + ' ' + food_id + '  ' + quantity);
    return {
        food_id: food_id,
        quantity: quantity
    };
}

Page.prototype.clickEditLastOrder = async function() {
    //get total row count
    row_length = await this.findTableSizeByXpath(locator.tableRowXPath);
    //build xpath for edit btn
    let edtBtnXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[7]/a";
    //click edit btn
    await this.clickBtnByXpath(edtBtnXPath);
}

Page.prototype.getTableRowCount = async function() {
    return await this.findTableSizeByXpath(locator.tableRowXPath);
}

Page.prototype.clickDelLastOrder = async function() {
    //get total row count
    row_length = await this.findTableSizeByXpath(locator.tableRowXPath);
    //build xpath for delete btn
    let delBtnXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[8]/a";
    //click delete btn
    await this.clickBtnByXpath(delBtnXPath);
    //click yes to alert
    await this.acceptAlert();
}

module.exports = Page;