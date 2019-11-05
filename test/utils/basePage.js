const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();

// o.addArguments('start-fullscreen');
o.addArguments('disable-infobars');
// o.addArguments('headless'); // running test on visual chrome browser
o.setUserPreferences({ credential_enable_service: false });

class Page {
    constructor(driverObj = null) {
        if (driverObj == null) {
            this.driver = new Builder()
                .setChromeOptions(o)
                .forBrowser('chrome')
                .build();
        }
        else {
            this.driver = driverObj;
        }
        // max the screen
        this.driver.manage().window().maximize();
        // visit a webpage
        this.visit = async function (theUrl) {
            return await this.driver.get(theUrl);
        };
        // quit current session
        this.quit = async function () {
            return await this.driver.quit();
        };
        // wait and find a specific element with it's id
        this.findById = async function (id) {
            await this.driver.wait(until.elementLocated(By.id(id)), 15000, 'Looking for element');
            return await this.driver.findElement(By.id(id));
        };
        // wait and find a specific element with it's name
        this.findByName = async function (name) {
            await this.driver.wait(until.elementLocated(By.name(name)), 15000, 'Looking for element');
            return await this.driver.findElement(By.name(name));
        };
        // wait and find a specific element with it's class name
        this.findByClassName = async function (name) {
            await this.driver.wait(until.elementLocated(By.className(name)), 15000, 'Looking for element');
            return await this.driver.findElement(By.className(name));
        };


        //table APIs 
        this.findTableCellTextByXPath = async function (path) {
            await this.driver.wait(until.elementLocated(By.xpath(path)), 15000, 'Looking for element');
            return this.driver.findElement(By.xpath(path)).getText();
        }

        this.findTableSizeByXpath = async function (path) {
            await this.driver.wait(until.elementLocated(By.xpath(path)), 15000, 'Looking for element');
            return this.driver.findElements(By.xpath(path)).then(rows => {
                return rows.length}).catch(e => console.log('dbg well we do NOT find it ' + e));
        }

        this.clickBtnByXpath = async function (path) {
            await this.driver.wait(until.elementLocated(By.xpath(path)), 15000, 'Looking for element');
            return this.driver.findElement(By.xpath(path)).click();
        }

        // fill input web elements
        this.write = async function (el, txt) {
            await el.clear();
            return await el.sendKeys(txt);
        };

        // send keys
        this.sendKeys = async function (key) {
            return this.driver.sendKeys(key);
        }

        // accpet alert
        this.acceptAlert = async function () {
            await this.driver.switchTo().alert().accept();
        }
    }
}

module.exports = Page;

