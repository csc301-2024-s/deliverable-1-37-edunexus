document.addEventListener('DOMContentLoaded', function() {
  const signupStatus = document.getElementById('signupStatus');
  if (signupStatus) {
    signupStatus.textContent = 'Ready to sign up...';
  } else {
    console.error('signupStatus element not found');
  }

  document.getElementById('signupBtn').addEventListener('click', function(event) {
    event.preventDefault();
    signupStatus.textContent = 'Processing...';
    signupStatus.style.color = 'blue';

    const signupSuccess = validateSignup();
    if (!signupSuccess) {
      signupStatus.textContent = 'Validation failed. Please correct the errors and try again.';
      signupStatus.style.color = 'red';
    }
  });

  window.api.receive('signupResponse', (response) => {
    if (response.success) {
      signupStatus.textContent = 'Signup successful!';
      signupStatus.style.color = 'green';
      setTimeout(() => window.location.href = 'login.html', 2000);
    } else {
      signupStatus.textContent = `Signup failed: ${response.error}`;
      signupStatus.style.color = 'red';
    }
  });

  const backToLoginBtn = document.getElementById('backToLoginBtn');
  backToLoginBtn.addEventListener('click', function() {
    window.location.href = 'login.html';
  });
  
});

function validateSignup() {

  clearErrorMessages();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  let isValid = true;
  if (username === '') {
    displayError('username', 'Please enter a username.');
    isValid = false;
  }
  if (email === '') {
    displayError('email', 'Please enter an email.');
    isValid = false;
  } else if (!validateEmail(email)) {
    displayError('email', 'Invalid email format.');
    isValid = false;
  }
  if (password === '') {
    displayError('password', 'Please enter a password.');
    isValid = false;
  }
  if (confirmPassword === '') {
    displayError('confirmPassword', 'Please confirm your password.');
    isValid = false;
  } else if (password !== confirmPassword) {
    displayError('confirmPassword', 'Passwords do not match.');
    isValid = false;
  }

  if (isValid) {
    window.api.send('signupData', { username, email, password });
  }
  return isValid;
}

function displayError(elementId, message) {
  const errorElement = document.getElementById(elementId + 'Error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.color = 'red';
  }
}

function clearErrorMessages() {
  ['username', 'email', 'password', 'confirmPassword'].forEach(id => {
    displayError(id, '');
  });
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}