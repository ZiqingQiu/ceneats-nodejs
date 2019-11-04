let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.logIn = async function() {
    logInButton = await this.findById(locator.loginBtnId);
    await logInButton.click();
    usrName = await this.findByName(locator.loginUserName);
    await usrName.sendKeys('300919236');
    usrPwd = await this.findByName(locator.loginPwdName);
    await usrPwd.sendKeys('12345');
    submitBtn = await this.findByClassName(locator.submitBtnClassName);
    await submitBtn.click();
    return true;
}

Page.prototype.viewOrderList = async function() {
    orderPageButton = await this.findById(locator.orderPageBtnId);
    await orderPageButton.click();
    return true;
}

Page.prototype.clickRestaurant = async function(resName = locator.timhortonResName) {
    resImgBtn = await this.findByName(resName);
    await resImgBtn.click();
    return true;
}

module.exports = Page;