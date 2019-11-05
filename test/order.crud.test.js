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
const OrderPage = require('./utils/order');
const ItemPage = require('./utils/item');

process.on('unhandledRejection', () => { });

(async function testCase1() {
    try {
        describe ('Ceneats order CRUD testing', async function () {
            this.timeout(50000);
            let driver, indexPage;

            beforeEach (async () => {
                indexPage = new IndexPage();
                driver = indexPage.driver;
                await indexPage.visit(startURL);
                await indexPage.logIn();
            });

            afterEach (async () => {
                //await indexPage.quit();
                //await orderPage.quit();
            });

            it ('Create an order', async () => {
                //click order list
                await indexPage.viewOrderList();
                orderPage = new OrderPage(driver);
                //click continue order
                await orderPage.continueOrder();
                //click tim horton
                await indexPage.clickRestaurant();
                //click add order
                itemPage = new ItemPage(driver);
                await itemPage.clickAddOrder();
                //add order
                let food_id_expect = '1101', food_quantity_expect = '5';
                await orderPage.addOrder(food_id_expect, food_quantity_expect);
                //check latest order
                const result = await orderPage.getLastOrder();
                expect(result.food_id).to.equal(food_id_expect);
                expect(result.quantity).to.equal(food_quantity_expect);               
            });


        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {
    }
})();