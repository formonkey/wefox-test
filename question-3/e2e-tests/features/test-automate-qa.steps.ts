import * as fs from 'fs';

import { defineSupportCode } from 'cucumber';
import { browser, by, element, protractor } from 'protractor';

import { expect } from '../config/helpers/chai-imports';

const until = protractor.ExpectedConditions;

const wait = async (el: any) => {
    await browser.wait(until.presenceOf(el), 10000, 'Element taking too long to appear in the DOM')
};

defineSupportCode(({ Given, When, Then }) => {
    Given('I visit the Wefox administrator login page', givenVisitHomepage);
    async function givenVisitHomepage(): Promise<void> {
        browser.waitForAngularEnabled(false);

        await browser.get('https://my.wefox.de/login');
    }

    Then(/I check that I am really on the login page by the title of the page "([^"]*)"$/, givenSubmitName);
    async function givenSubmitName(title: string): Promise<void> {
        wait(element(by.css('.section-login-show')));

        await expect(browser.getTitle()).to.eventually.equal(title);
    }

    Given(/^I enter my email in the username input "([^"]*)"$/, setMailInForm);
    async function setMailInForm(userName: string): Promise<void> {
        const el = element(by.id('user_name'));

        wait(el);

        return el.sendKeys(userName);
    }

    Given(/^I enter my password in the password input "([^"]*)"$/, setPasswordInForm);
    async function setPasswordInForm(password: string): Promise<void> {
        const el = element(by.id('password'));

        await wait(el);

        return el.sendKeys(password);
    }

    Given('I click on the submit button of the login form', sendLoginData);
    async function sendLoginData(): Promise<void> {
        await browser.sleep(1000);

        const el = element(by.css('button[type="submit"]'));

        await wait(el);

        return element(by.css('button[type="submit"]')).click();
    }

    Given('I access the initial page of my profile and check if my image exists', checkImageAgent);
    async function checkImageAgent(): Promise<void> {
        const el = element(by.css('.wf-c-header-agent__image'));
        const src = 'https://s3.eu-central-1.amazonaws.com/financefox-pro-public-bucket/Agent/a0f58000000C0UvAAK/QAlogowefox.png';

        wait(el);

        return expect(el.getAttribute('src')).to.eventually.equal(src);
    }

    Given('I access my contracts view', checkMyContracts);
    async function checkMyContracts(): Promise<void> {
        const el = element(by.css('[data-url="contracts#index"]'));

        await wait(el);

        el.click();
    }

    Given('I access my personal detail information view', saveProfileData);
    async function saveProfileData(): Promise<void> {
        let el = element(by.css('[data-url="account#show"]'));

        await wait(el);

        el.click();

        el = element(by.css('[data-track-event-action="PersonalDetails"]'));

        await wait(el);

        el.click();
    }

    Given('I get all user information and save in json', getAllData);
    async function getAllData() {
        await browser.sleep(1000);

        const city = await element(by.css('#city')).getAttribute('value');
        const email = await element(by.css('#email')).getAttribute('value');
        const phone = await element(by.css('#phone')).getAttribute('value');
        const street = await element(by.css('#street')).getAttribute('value');
        const zipCode = await element(by.css('#zip_code')).getAttribute('value');
        const lastName = await element(by.css('#last_name')).getAttribute('value');
        const birthDate = await element(by.css('#birthdate')).getAttribute('value');
        const firstName = await element(by.css('#first_name')).getAttribute('value');

        const user = {
            city,
            email,
            phone,
            street,
            'zip_code': zipCode,
            'last_name': lastName,
            'birthdate': birthDate,
            'first_name': firstName,
        };

        console.log(user);

        fs.writeFile('user.json', JSON.stringify(user), () => {});
    }

    Then(/I click on the logout button and reach the main page of the web that should have this title "([^"]*)"$/, logout);
    async function logout(title: string) {
        const el = element(by.css('[data-url="logout#show"]'));

        await wait(el);

        el.click();

        await browser.sleep(1000);

        await expect(browser.getTitle()).to.eventually.equal(title);
    }
});
