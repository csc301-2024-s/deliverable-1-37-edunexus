const { browser, expect, $ } = require('@wdio/globals');
const e = require('express');
const { deleteUserByEmail } = require('../../database');

describe('Electron Testing', () => {
    it('should give the appropriate app title', async () => {
        const appTitle = await browser.getTitle();
        const expectedAppTitle = 'Login - EduNexus App';
        expect(appTitle).toEqual(expectedAppTitle);
    })
})

describe('Testing redirecting buttons', () => {
    // When the signup button is clicked
    it('should redirect to the signup page', async () => {  
      await $('#signupBtn').click()
      const appTitle = await browser.getTitle();
      const expectedAppTitle = 'Signup - EduNexus App';
      expect(appTitle).toEqual(expectedAppTitle);
    })

    // When the back to login button is clicked
    it('should redirect to the login page', async () => {  
      await $('#backToLoginBtn').click()
      const appTitle = await browser.getTitle();
      const expectedAppTitle = 'Login - EduNexus App';
      expect(appTitle).toEqual(expectedAppTitle);
    })
})

describe('Testing error message in the signup page', () => {
    it('should display an error message if the username is empty', async () => {
        await $('#signupBtn').click()
        await $('#username').setValue('');
        await $('#signupBtn').click();
        const errorMessage = await $('#signupStatus').getText();
        const expectedErrorMessage = 'Validation failed. Please correct the errors and try again.';
        expect(errorMessage).toEqual(expectedErrorMessage);
    }) 
    
    it('should display an error message if the email is empty', async () => {
        await $('#signupBtn').click()
        await $('#email').setValue('');
        await $('#signupBtn').click();
        const errorMessage = await $('#signupStatus').getText();
        const expectedErrorMessage = 'Validation failed. Please correct the errors and try again.';
        expect(errorMessage).toEqual(expectedErrorMessage);
    })

    it('should display an error message if the email is invalid', async () => {
        await $('#signupBtn').click()
        await $('#email').setValue('invalidEmail');
        await $('#signupBtn').click();
        const errorMessage = await $('#signupStatus').getText();
        const expectedErrorMessage = 'Validation failed. Please correct the errors and try again.';
        expect(errorMessage).toEqual(expectedErrorMessage);
    })

    it('should display an error message if the password is empty', async () => {
        await $('#signupBtn').click()
        await $('#password').setValue('');
        await $('#signupBtn').click();
        const errorMessage = await $('#signupStatus').getText();
        const expectedErrorMessage = 'Validation failed. Please correct the errors and try again.';
        expect(errorMessage).toEqual(expectedErrorMessage);
    })

    it('should display an error message if the confirm password is empty', async () => {
        await $('#signupBtn').click()
        await $('#confirmPassword').setValue('');
        await $('#signupBtn').click();
        const errorMessage = await $('#signupStatus').getText();
        const expectedErrorMessage = 'Validation failed. Please correct the errors and try again.';
        expect(errorMessage).toEqual(expectedErrorMessage);
    })

    it('should display an error message if the confirm password does not match the password', async () => {
        await $('#signupBtn').click()
        await $('#password').setValue('password');
        await $('#confirmPassword').setValue('password1');
        await $('#signupBtn').click();
        const errorMessage = await $('#signupStatus').getText();
        const expectedErrorMessage = 'Validation failed. Please correct the errors and try again.';
        expect(errorMessage).toEqual(expectedErrorMessage);
    })

    it('should not display an error message and redirect to the login page if all fields are valid', async () => {
        await $('#signupBtn').click()
        await $('#username').setValue('username1');
        await $('#email').setValue('test1@test.com');
        await $('#password').setValue('password');
        await $('#confirmPassword').setValue('password');
        await $('#signupBtn').click();
        const errorMessage = await $('#signupStatus').getText();
        const expectedErrorMessage = 'Processing...';
        expect(errorMessage).toEqual(expectedErrorMessage);
        
        await browser.pause(2000);
        expect(await $('#signupStatus').getText()).toEqual('Signup successful!');

        await browser.pause(2000);
        const appTitle = await browser.getTitle();
        const expectedAppTitle = 'Login - EduNexus App';
        expect(appTitle).toEqual(expectedAppTitle);
    })

    it('should display an error message if the email is already in use', async () => {
        await $('#signupBtn').click()
        await $('#username').setValue('username2');
        const email = 'test1@test.com'
        await $('#email').setValue(email);
        await $('#password').setValue('password');
        await $('#confirmPassword').setValue('password');
        await $('#signupBtn').click();
        const errorMessage = await $('#signupStatus').getText();
        const expectedErrorMessage = 'Signup failed: Email already in use';
        expect(errorMessage).toEqual(expectedErrorMessage);

        // Clean up the database
        await deleteUserByEmail(email);
    })
})
