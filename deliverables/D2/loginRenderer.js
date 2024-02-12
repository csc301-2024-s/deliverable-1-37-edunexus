console.log('loginRenderer script is loaded');

function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log('Username:', username);
    console.log('Password:', password);
    if (username === 'admin' && password === 'admin') {
        console.log('Login successful');
        return true;
    } else {
        console.log('Login failed');
        alert('Login failed');
        return false;
    }
}



document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginBtn').addEventListener('click', function() {
        const LoginSuccess = validateLogin();
        console.log('LoginSuccess:', LoginSuccess);
        if (LoginSuccess) {
            window.location.href = 'report.html';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupBtn').addEventListener('click', function() {
        window.location.href = 'signup.html';
    });
});