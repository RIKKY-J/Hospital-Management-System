const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('City Hospital - Admin Dashboard', function() {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should load Admin Dashboard with doctor, user, and appointment tables', async () => {
    await driver.get('http://localhost:3000/public/admin.html');

    const doctorTable = await driver.wait(until.elementLocated(By.id('doctorTable')), 5000);
    const userTable = await driver.findElement(By.id('userTable'));
    const apptTable = await driver.findElement(By.id('apptTable'));

    expect(await doctorTable.isDisplayed()).to.be.true;
    expect(await userTable.isDisplayed()).to.be.true;
    expect(await apptTable.isDisplayed()).to.be.true;
  });
});
