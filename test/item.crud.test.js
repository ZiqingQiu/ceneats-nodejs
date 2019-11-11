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
const ItemPage = require('./utils/item');

process.on('unhandledRejection', () => { });

(async function itemCrud() {
    try {
        describe('Ceneats item CRUD testing', async function () {
            this.timeout(50000);
            let driver, indexPage;

            beforeEach(async () => {
                indexPage = new IndexPage();
                driver = indexPage.driver;
                await indexPage.visit(startURL);
                await indexPage.logIn('Restaurant');
            });

            afterEach(async () => {
                //await driver.quit();
            });

            // Test Case -- Create an item
            it('Create an item', async () => {
                //click tim horton
                await indexPage.clickRestaurant();
                //click add item
                itemPage = new ItemPage(driver);
                await itemPage.clickAddItem();
            });

            // // Test Case -- Edit an item
            // it('Edit an order', async () => {
            //     //click item list
            
            // });

            // // Test Case -- Delete an item
            // it('Delete an item', async () => {
            //     //click item list
            // });

        });
    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {
    }
})();