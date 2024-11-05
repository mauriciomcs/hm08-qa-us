module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    phoneCodeField: '#code',
    cardNumberField: '#number',
    cardCodeField: '.card-second-row #code',
    messageToTheDriverField: '#comment',
    
    // Buttons
    supportiveTariff: 'div=Supportive',
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[@class=\'np-button\']//div[contains(text(), \'Phone number\')]',
    paymentMethodButton: '.pp-text',
    nextButtonAddPhoneModal: 'button=Next',
    confirmButtonAddPhoneModal: 'button=Confirm',
    addCardButton: 'div=Add card',
    linkCardButton: 'button=Link',
    paymentMethodAddedCard: 'div=Card',
    paymentMethodModalCloseButton: '.payment-picker .section.active .close-button',
    blanketButton: '.switch',
    blanketButtonStatus: '.switch-input',
    iceCreamPlusButton: 'div=+',
    orderButton: '.smart-button-main=Order',

    // Modals
    phoneNumberModal: '.number-picker .modal',
    paymentMethodModal: '.payment-picker .modal',
    carSearchModal: 'div=Car search',
    driverWillArriveModal: 'div*=The driver will arrive',

    // Helper function to click an element
    async clickElement(selector) {
        const element = await $(selector);
        await element.waitForDisplayed();
        await element.click();
    },

    // Functions
    fillAddresses: async function (from, to) {
        await $(this.fromField).setValue(from);
        await $(this.toField).setValue(to);
        await this.clickElement(this.callATaxiButton);
    },
    
    fillPhoneNumber: async function (phoneNumber) {
        try {
            await this.clickElement(this.phoneNumberButton);
            await $(this.phoneNumberModal).waitForDisplayed();
            await $(this.phoneNumberField).setValue(phoneNumber);
        } catch (error) {
            console.error('Error filling phone number:', error);
        }
    },

    submitPhoneNumber: async function (phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        await browser.setupInterceptor();
        await this.clickElement(this.nextButtonAddPhoneModal);
        await browser.pause(2000);

        const requests = await browser.getRequests();
        await expect(requests.length).toBe(1);
        const code = await requests[0].response.body.code;

        await $(this.phoneCodeField).setValue(code);
        await this.clickElement(this.confirmButtonAddPhoneModal);
    },

    selectSupportiveTariff: async function () {
        const supportiveTariff = await $(this.supportiveTariff);
        await supportiveTariff.waitForDisplayed();
        supportiveTariff.click();
        return supportiveTariff;
    },

    addPaymenMethodCard: async function (cardNumber, cardCode) {
        await this.clickElement(this.paymentMethodButton);
        await this.clickElement(this.addCardButton);
        await $(this.cardNumberField).setValue(cardNumber);
        await $(this.cardCodeField).setValue(cardCode);
        await $(this.paymentMethodModal).waitForDisplayed();
        await this.clickElement(this.linkCardButton);
        await this.clickElement(this.paymentMethodModalCloseButton);
    },

    addMessageToTheDriver: async function (message) {
        await $(this.messageToTheDriverField).waitForDisplayed();
        await $(this.messageToTheDriverField).setValue(message);
    },

    addBlanketAndHandkerchiefs: async function () {
        await this.clickElement(this.blanketButton);
    },

    addIceCream: async function (qty) {
        await this.clickElement(this.iceCreamPlusButton);
        for (let i = 0; i < qty - 1; i++) {
            await this.clickElement(this.iceCreamPlusButton); // Click again for additional ice creams
        }
    },

    placeOrder: async function () {
        await this.clickElement(this.orderButton);
    }
};
