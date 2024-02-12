const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('signupBtn').addEventListener('click', function() {
      // TODO: Validate the input fields
      // window.location.href = 'login.html';
  });
});

function validateSignup() {

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  
  if (username === '' || email === '' || password === '' || confirmPassword === '') {
    alert('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Invalid email format');
    return;
  }
  ipcRenderer.send('signupData', { username, email, password });

}