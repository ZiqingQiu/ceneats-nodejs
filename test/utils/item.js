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



module.exports = Page;