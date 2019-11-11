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
                //prepare item para
                let itemId = '1188';
                let itemName = 'testItem';
                let inventory = '888';
                let imgurl = 'testDummyUrl';
                let price = '4.56';
                await itemPage.inputItem(itemId,itemName,inventory,imgurl,price);
                //check latest item
                const result = await itemPage.getLastItem();
                expect(result.item_id).to.equal(itemId);
                expect(result.item_name).to.equal(itemName);
                expect(result.item_inventory).to.equal(inventory);
                expect(result.item_price).to.equal(price);
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