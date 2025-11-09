const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('City Hospital - Admin Login', function() {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should log in successfully as Admin', async () => {
    try {
      // ✅ Step 1: Navigate to login page
      await driver.get('http://localhost:3000/public/staff.html');
      await driver.sleep(1000);

      // ✅ Step 2: Fill login form
      const username = await driver.findElement(By.name('username'));
      const password = await driver.findElement(By.name('password'));
      await username.sendKeys('admin');
      await password.sendKeys('admin123');

      // ✅ Step 3: Select role
      const dropdown = await driver.findElement(By.name('role'));
      await driver.executeScript("arguments[0].scrollIntoView(true);", dropdown);
      await dropdown.click();

      const adminOption = await driver.wait(
        until.elementLocated(By.xpath("//option[text()='Admin']")),
        5000
      );
      await adminOption.click();

      // ✅ Step 4: Click Login button
      const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
      await driver.executeScript("arguments[0].click();", loginBtn);

      // ✅ Step 5: Wait for Dashboard
      const dashboardTitle = await driver.wait(until.elementLocated(By.tagName('h1')), 10000);
      const text = await dashboardTitle.getText();

      expect(text).to.include('Admin Dashboard');
      console.log('✅ Admin Login Test Passed');

    } catch (err) {
      console.error('❌ Test Failed:', err.message);
      throw err; // ensures Allure records it as failed
    }
  });
});

