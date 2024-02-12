console.log('loginRenderer script is loaded');

document.getElementById('loginBtn').addEventListener('click', function() {
    // validate the login credentials here
    window.location.href = 'report.html';
    console.log('Login button clicked');
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginBtn').addEventListener('click', function() {
        window.location.href = 'report.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupBtn').addEventListener('click', function() {
        window.location.href = 'signup.html';
    });
});