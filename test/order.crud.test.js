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

(async function orderCrud() {
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
                await driver.quit();
            });

            // Test Case -- Create an order
            it('Create an order', async () => {
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
                await orderPage.inputOrder(food_id_expect, food_quantity_expect);
                //check latest order
                const result = await orderPage.getLastOrder();
                expect(result.food_id).to.equal(food_id_expect);
                expect(result.quantity).to.equal(food_quantity_expect);
            });

            // Test Case -- Edit an order
            it('Edit an order', async () => {
                //click order list
                await indexPage.viewOrderList();
                orderPage = new OrderPage(driver);
                //click last edit btn
                orderPage.clickEditLastOrder();
                let food_id_expect = '1103', food_quantity_expect = '8';
                await orderPage.inputOrder(food_id_expect, food_quantity_expect);
                //check latest order
                const result = await orderPage.getLastOrder();
                expect(result.food_id).to.equal(food_id_expect);
                expect(result.quantity).to.equal(food_quantity_expect);
            });

            // Test Case -- Delete an order
            it('Delete an order', async () => {
                //click order list
                await indexPage.viewOrderList();
                orderPage = new OrderPage(driver);
                //get current row count
                let row_length_before_del = await orderPage.getTableRowCount();
                if (1 == row_length_before_del) {
                    console.log('There is no order, therefore can not perform delete test');
                    return true;
                }
                //click last delete btn
                await orderPage.clickDelLastOrder();
                //validate total order number -1
                let row_length_after_del = await orderPage.getTableRowCount();
                expect(row_length_after_del).to.equal(row_length_before_del-1);
            });
        });
    } catch (ex) {
        console.log(new Error(ex.message));
    } finally {
    }
})();