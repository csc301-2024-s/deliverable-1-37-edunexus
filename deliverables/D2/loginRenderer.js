console.log('loginRenderer script is loaded');

function validateLogin() {
    const emailElement = document.getElementById('email');
    const passwordElement = document.getElementById('password');
    
    if (!emailElement || !passwordElement) {
        console.error('The email or password fields cannot be found.');
        return;
    }

    const email = emailElement.value;
    const password = passwordElement.value;
    console.log('Email:', email);
    console.log('Password:', password);

    window.api.send('loginData', { email, password });
}


function handleLoginResponse(response) {
    if (!response) {
        console.error('Received undefined response');
        return;
    }

    if (response.success) {
        console.log('Login successful');
        window.location.href = 'report.html';
    } else {
        console.log('Login failed:', response.error);
        alert('Login failed: ' + response.error);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    window.api.receive('loginResponse', handleLoginResponse);

    document.getElementById('loginBtn').addEventListener('click', function() {
        validateLogin();
    });

    document.getElementById('signupBtn').addEventListener('click', function() {
        window.location.href = 'signup.html';
    });
});