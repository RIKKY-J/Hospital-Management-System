const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('City Hospital - Delete Appointment', function() {
  this.timeout(25000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should delete an appointment successfully', async () => {
    await driver.get('http://localhost:3000/public/admin.html');

    const deleteBtn = await driver.wait(until.elementLocated(By.css('.btn.red')), 5000);
    await driver.executeScript("arguments[0].scrollIntoView(true);", deleteBtn);
    await deleteBtn.click();

    await driver.sleep(500);
    const confirmText = await driver.switchTo().alert();
    await confirmText.accept();

    // Wait and verify table refresh
    const apptTable = await driver.wait(until.elementLocated(By.id('apptTable')), 5000);
    const tableText = await apptTable.getText();
    expect(tableText).to.not.include('John Doe');
  });
});
