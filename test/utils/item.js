let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.clickAddOrder = async function () {
    addOrderButton = await this.findById(locator.addOrderBtnId);
    await addOrderButton.click();
    return true;
}


Page.prototype.clickAddItem = async function () {
    addItemButton = await this.findById(locator.addItemBtnId);
    await addItemButton.click();
    return true;
}


Page.prototype.inputItem = async function (itemId, itemName, inventory, imgurl, price) {
    //input item id
    itemIdEle = await this.findById(locator.itemId);
    await this.write(itemIdEle, itemId);
    //input item name
    itemNameEle = await this.findById(locator.itemNameId);
    await this.write(itemNameEle, itemName);
    //input item inventory
    itemInventoryEle = await this.findById(locator.itemInventoryId);
    await this.write(itemInventoryEle, inventory);
    //input item imgurl
    itemImgURLEle = await this.findById(locator.itemURLId);
    await this.write(itemImgURLEle, imgurl);
    //input item price
    itemPriceEle = await this.findById(locator.itemPriceId);
    await this.write(itemPriceEle, price);
    //click submit
    submitBtn = await this.findByClassName(locator.selectBtnClassName);
    await submitBtn.click();
}

Page.prototype.getLastItem = async function() {
    //get total row count
    row_length = await this.findTableSizeByXpath(locator.itemTableRowXpath);
    //build xpath for itemid Element
    let itemIdEleXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[2]";
    item_id = await this.findTableCellTextByXPath(itemIdEleXPath);
    //build xpath for itemName ele
    let itemNameEleXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[4]";
    item_name = await this.findTableCellTextByXPath(itemNameEleXPath);
    //build xpath for itemInventory ele
    let itemInventoryEleXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[5]";
    item_inventory = await this.findTableCellTextByXPath(itemInventoryEleXPath);    
    //build xpath for itemPrice ele
    let itemPriceEleXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[7]";
    item_price = await this.findTableCellTextByXPath(itemPriceEleXPath);   

    //console.log('dbg ' + row_length + ' ' + food_id + '  ' + quantity);
    return {
        item_id: item_id,
        item_name: item_name,
        item_inventory: item_inventory,
        item_price: item_price
    };
}

Page.prototype.clickEditLastItem = async function () {
    //get total row count
    row_length = await this.findTableSizeByXpath(locator.itemTableRowXpath);
    //build xpath for edit btn
    let edtBtnXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[8]/a";
    //click edit btn
    await this.clickBtnByXpath(edtBtnXPath);
}

Page.prototype.clickDeleteLastItem = async function () {
    //get total row count
    row_length = await this.findTableSizeByXpath(locator.itemTableRowXpath);
    //build xpath for delete btn
    let delBtnXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[9]/a";
    //click delete btn
    await this.clickBtnByXpath(delBtnXPath);
    //click yes to alert
    await this.acceptAlert();
}

Page.prototype.getTableRowCount = async function() {
    return await this.findTableSizeByXpath(locator.itemTableRowXpath);
}

module.exports = Page;