const { describe, it, after, before } = require('mocha');
const Page = require('./utils/index');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function testCase1() {
    try {
        describe ('Ceneats log in testing', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit('https://ceneats.herokuapp.com');
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('find the login button', async () => {
                const result = await page.clickLogInButton();
                expect(result.inputEnabled).to.equal(true);
            });
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {
    }
})();