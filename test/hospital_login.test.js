const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('City Hospital - Other Staff Roles', function() {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  const roles = ['Doctor', 'Nurse', 'Staff'];

  roles.forEach(role => {
    it(`should log in and show Coming Soon for ${role}`, async () => {
      await driver.get('http://localhost:3000/public/staff.html');

      await driver.findElement(By.name('username')).sendKeys('test');
      await driver.findElement(By.name('password')).sendKeys('test123');

      const roleDropdown = await driver.findElement(By.name('role'));
      await driver.executeScript("arguments[0].scrollIntoView(true);", roleDropdown);
      await roleDropdown.click();

      const option = await driver.findElement(By.xpath(`//option[text()='${role}']`));
      await option.click();

      await driver.findElement(By.css('button[type=\"submit\"]')).click();

      const title = await driver.wait(until.elementLocated(By.tagName('h1')), 5000);
      const text = await title.getText();
      expect(text).to.include('Coming Soon');
    });
  });
});
