const page = require('../../page');
const helper = require('../../helper');

describe('Taxi order flow', () => {
    beforeEach(async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    });

    it('should get the supportive mode taxi driver', async () => {
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');
    });

    it('should select supportive mode taxi', async () => {
        const supportiveTariff = await page.selectSupportiveTariff();
        await expect(supportiveTariff.parentElement()).toHaveElementClass('active');
    });

    it('should add a phone number', async () => {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await $(`div=${phoneNumber}`)).toBeExisting();
    });

    it('should add a card payment method', async () => {
        const cardNumber = helper.getCardNumber();
        const cardCode = helper.getCardCode();
        await page.addPaymenMethodCard(cardNumber, cardCode);
        await expect(await $(`${page.paymentMethodAddedCard}`)).toBeExisting();
    });

    it('should add a message to the driver', async () => {
        const message = "Waiting outside";
        await page.addMessageToTheDriver(message);
        await expect($(page.messageToTheDriverField)).toHaveValue(message);
    });

    it('should add a blanket and handkerchiefs', async () => {
        await page.selectSupportiveTariff();
        await page.addBlanketAndHandkerchiefs();
        await expect($(page.blanketButtonStatus)).toBeChecked();
    });

    it('should add 2 ice creams', async () => {
        await page.selectSupportiveTariff();
        const iceCreamQty = 2;
        await page.addIceCream(iceCreamQty);
        await expect($(`div=${iceCreamQty}`)).toBeExisting();
    });

    it('should start search for a taxi', async () => {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await page.placeOrder();
        await expect($(`${page.carSearchModal}`)).toBeExisting();
    });

    it('should find a driver', async () => {
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        const message = "Waiting outside";
        await page.addMessageToTheDriver(message);
        await page.placeOrder();
        await browser.pause(30000);
        await expect($(`${page.driverWillArriveModal}`)).toBeExisting();
    });
});
