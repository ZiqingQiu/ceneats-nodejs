let Page = require('./basePage');
const locator = require('./locator');

Page.prototype.addFeedBack = async function () {
    addFdBackBtn = await this.findById(locator.addReviewBtnId);
    await addFdBackBtn.click();
    return true;
}

Page.prototype.inputFeedBack = async function (resName, fdBack) {
    //select restaurant dropdown
    let resItems = await this.findById(locator.fdResDpDownId);
    await resItems.click();
    //select restaurant
    let res_locator = null;
    switch (resName) {
        case "Burger King":
            res_locator = locator.fdBackResBKId;
            break;
        case "Mcdonald":
            res_locator = locator.fdBackResMCDId;
            break;
        case "Pizza Pizza":
            res_locator = locator.fdBackResPPId;
            break;
        case "Tim Hortons":
            res_locator = locator.fdBackResTHId;
            break;
        case "Smokes Poutinerie":
            res_locator = locator.fdBackResSPId;
            break;
        case "Subway":
            res_locator = locator.fdBackResSWId;
            break;
        default:
            console.log("Wrong restaurant name: " + resName);
            this.quit();
    }
    resItem = await this.findById(res_locator);
    await resItem.click();
    //input feedback
    let inputCommentBox = await this.findById(locator.fdBackCommentId);
    await this.write(inputCommentBox, fdBack);
    //submit new feedback
    let submitBtn = await this.findByClassName(locator.selectBtnClassName);
    await submitBtn.click();
}

Page.prototype.getLastFeedback = async function () {
    //get total row count
    row_length = await this.findTableSizeByXpath(locator.fdBackTableRowXpath);
    //build xpath for restaurant ele
    let resNameXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[3]";
    resName = await this.findTableCellTextByXPath(resNameXPath);
    //build xpath for comments ele
    let commentsXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[4]";
    comment = await this.findTableCellTextByXPath(commentsXPath);
    return {
        resName: resName,
        comment: comment
    };
}

Page.prototype.clickEditLastFeedBack = async function () {
    //get total row count
    row_length = await this.findTableSizeByXpath(locator.fdBackTableRowXpath);
    //build xpath for edit btn
    let edtBtnXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[5]/a";
    //click edit btn
    await this.clickBtnByXpath(edtBtnXPath);
}

Page.prototype.inputFeedBackonly = async function (fdBack) {

    //input feedback
    let inputCommentBox = await this.findById(locator.fdBackCommentId);
    await this.write(inputCommentBox, fdBack);
    //submit new feedback
    let submitBtn = await this.findByClassName(locator.selectBtnClassName);
    await submitBtn.click();
}

Page.prototype.getTableRowCount = async function () {
    return await this.findTableSizeByXpath(locator.fdBackTableRowXpath);
}

Page.prototype.clickDelLastFeedBack = async function() {
    //get total row count
    row_length = await this.findTableSizeByXpath(locator.fdBackTableRowXpath);
    //build xpath for delete btn
    let delBtnXPath = "//*[@id='centerForm_C']/div/table/tbody/tr[" + row_length + "]/td[6]/a";
    //click delete btn
    await this.clickBtnByXpath(delBtnXPath);
    //click yes to alert
    await this.acceptAlert();
}

module.exports = Page;