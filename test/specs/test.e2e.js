/* eslint-disable */
const  {browser} = require('@wdio/globals');

describe('Basic Testing', () => {
    it('should give the appropriate app title', async () => {
        const appTitle = await browser.getTitle();
        const expectedAppTitle = 'EduNexus';
        expect(appTitle).toEqual(expectedAppTitle);
    });

    it('should redirect to the dashboard page', async () => {
        await $('#username').setValue('admin');
        await $('#password').setValue('password');
        await $('#signinBtn').click();
        const isLogOutBtn = await $('#logoutBtn').isExisting();
        expect(isLogOutBtn).toEqual(true);

    });

    it('should redirect to the login page', async () => {
        await (await $('#logoutBtn')).click();
        const isSigninBtn = await $('#signinBtn').isExisting();
        expect(isSigninBtn).toEqual(true);
    });
});


describe('Student Info Popup testing', () => {
    it('should pop up a student info window', async () => {
        // Sign in
        await $('#username').setValue('admin');
        await $('#password').setValue('password');
        await $('#signinBtn').click();

        // Click on a student id
        await $('#studentInfoBtn').click();
        const isStudentInfoPopup = await $('#studentInfoPopup').isExisting();
        expect(isStudentInfoPopup).toEqual(true);
    });

    
});
