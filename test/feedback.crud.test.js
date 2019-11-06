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

(async function testCase1() {
    try {
        describe('Ceneats order CRUD testing', async function () {
            this.timeout(50000);
            let driver, indexPage;

            beforeEach(async () => {
                indexPage = new IndexPage();
                driver = indexPage.driver;
                await indexPage.visit(startURL);
                await indexPage.logIn();
            });

            afterEach(async () => {
                //await driver.quit();
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
                fdBackPage.inputFeedBack(restaurant, comments);
            });

        });
    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {
    }
})();