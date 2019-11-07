//test env
//const startURL = 'https://ceneats.herokuapp.com';
const startURL = 'localhost:3000';

//dependencies
const { describe, it, after, before } = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const IndexPage = require('./utils/index');
const FeedBackPage = require('./utils/feedback');

process.on('unhandledRejection', () => { });

(async function feedBackCrud() {
    try {
        describe('Ceneats feedback CRUD testing', async function () {
            this.timeout(50000);
            let driver, indexPage;

            beforeEach(async () => {
                indexPage = new IndexPage();
                driver = indexPage.driver;
                await indexPage.visit(startURL);
                await indexPage.logIn();
            });

            afterEach(async () => {
                await driver.quit();
            });

            // Test Case -- Create a feedback
            it('Create a feedback', async () => {
                //click view feedback
                await indexPage.viewFeedBackList();
                fdBackPage = new FeedBackPage(driver);
                //click add new feedback
                fdBackPage.addFeedBack();
                //input feedback
                let restaurant = "Tim Hortons";
                let comments = "The chicken wrap tastes good.";
                await fdBackPage.inputFeedBack(restaurant, comments);
                //check latest feedback
                fdBackPage = new FeedBackPage(driver);
                const result = await fdBackPage.getLastFeedback();
                expect(result.resName).to.equal(restaurant);
                expect(result.comment).to.equal(comments);
            });

            // Test Case -- Edit a feedback
            it('Edit a feedback', async () => {
                //click view feedback
                await indexPage.viewFeedBackList();
                fdBackPage = new FeedBackPage(driver);
                //click edit feedback
                fdBackPage.clickEditLastFeedBack();
                //edit comments
                let newComments = "This is tested editing comments."
                await fdBackPage.inputFeedBackonly(newComments);
                //validate results
                const result = await fdBackPage.getLastFeedback();
                expect(result.comment).to.equal(newComments);
            });

            // Test Case -- Delete a feedback
            it('Delete a feedback', async () => {
                //click view feedback
                await indexPage.viewFeedBackList();
                fdBackPage = new FeedBackPage(driver);
                //get current row count
                let row_length_before_del = await fdBackPage.getTableRowCount();     
                if (1 == row_length_before_del) {
                    console.log('There is no feedback, therefore can not perform delete test');
                    return true;
                }      
                //click last delete btn
                await fdBackPage.clickDelLastFeedBack();         
                //validate total feedback number -1
                let row_length_after_del = await fdBackPage.getTableRowCount();
                expect(row_length_after_del).to.equal(row_length_before_del-1);            
            });

        });
    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {
    }
})();