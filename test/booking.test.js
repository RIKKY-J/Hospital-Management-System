const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('City Hospital - Appointment Booking', function() {
  this.timeout(25000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should book an appointment successfully', async () => {
    await driver.get('http://localhost:3000/public/book.html');

    await driver.findElement(By.name('name')).sendKeys('John Doe');
    await driver.findElement(By.name('email')).sendKeys('john@example.com');
    await driver.findElement(By.name('phone')).sendKeys('1234567890');

    const deptDropdown = await driver.findElement(By.name('department'));
    await driver.executeScript("arguments[0].scrollIntoView(true);", deptDropdown);
    await deptDropdown.click();

    const deptOption = await driver.findElement(By.xpath("//option[text()='Cardiology']"));
    await deptOption.click();

    await driver.findElement(By.name('date')).sendKeys('2025-11-15');
    await driver.findElement(By.name('time')).sendKeys('10:30');
    await driver.findElement(By.css('button[type=\"submit\"]')).click();

    const successMsg = await driver.wait(until.elementLocated(By.id('successMessage')), 8000);
    const msgText = await successMsg.getText();
    expect(msgText).to.include('Appointment booked successfully');
  });
});
