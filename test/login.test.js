//test env
//const startURL = 'https://ceneats.herokuapp.com';
const startURL = 'localhost:3000';

const { describe, it, after, before } = require('mocha');
const Page = require('./utils/index');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => { });

(async function Login() {
    try {
        describe ('Ceneats log in testing', async function () {
            this.timeout(50000);
            let driver, page;

            beforeEach (async () => {
                page = new Page();
                driver = page.driver;
                await page.visit(startURL);
            });

            afterEach (async () => {
                await page.quit();
            });

            it ('Log in', async () => {
                const result = await page.logIn();
            });
        });
    } catch (ex) {
        console.log (new Error(ex.message));
    } finally {
    }
})();