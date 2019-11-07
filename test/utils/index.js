let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.logIn = async function(logInRole='Student') {
    logInButton = await this.findById(locator.loginBtnId);
    await logInButton.click();
    let userName, userPwd;
    switch (logInRole) {
        case 'Student': 
            userName = '300919236';
            userPwd = '12345';
            break;
        case 'Restaurant':
            userName = '300919237';
            userPwd = '23456';
            break;
        default:
            console.log('Error.. Invalid logInRole ' + logInRole);
            this.quit();
    }

    usrName = await this.findByName(locator.loginUserName);
    await usrName.sendKeys(userName);
    usrPwd = await this.findByName(locator.loginPwdName);
    await usrPwd.sendKeys(userPwd);
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

Page.prototype.viewFeedBackList = async function() {
    fdBackBtn = await this.findById(locator.reviewPageBtnId);
    await fdBackBtn.click();
    return true;
}

module.exports = Page;