# Sprint 8 Project: WebDriverIO UI Testing

This project contains automated tests written using WebDriverIO (wdio) for the Urban Routes web application. It focuses on testing the user interface and functionality of the "Order a Taxi" feature.

## Setup

Before running the tests, make sure you have the following software installed:

- Node.js
- npm (Node Package Manager)

To install the project dependencies, clone the repository and navigate to the project directory in your terminal. Then, run the following command:
```npm install```

## Configuration
The tests are configured to run on the Urban Routes web application. To set the application URL, open the wdio.conf.js file located in the project's root directory. Look for the baseUrl property and update it with the URL of your Urban Routes application.

By default, the tests run in headless mode on two browsers: Chrome and Firefox. This can be changed in wdio.conf.js by commenting out these lines of configurations.

## Running the Tests
To run all the tests, use the following command:
```npm run wdio```

## Test Cases
* Select the "Supportive" taxi mode – PASS
* Add a phone number to the order. – PASS
* Add a card payment method. – PASS
* Add a message to the driver. – PASS
* Add a blanket and handkerchiefs to the order. – PASS
* Add 2 ice creams to the order. – PASS
* Place the order. – PASS
* Find a driver. – PASS

## Code Style
To maintain consistency and readability in the code, adhere to the following style guidelines:

Indentation: Use 4 spaces for indentation. Avoid using tabs.
Variable Naming: Use camelCase for variable names and function names (e.g., addIceCream, getPhoneNumber).
Function Declarations: Use async function syntax for asynchronous functions and include error handling where appropriate.
Comments: Write clear and concise comments for functions and complex logic to enhance code readability.
File Organization: Organize files into directories based on their purpose (e.g., pages, createAnOrder, helper).