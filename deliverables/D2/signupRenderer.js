document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('signupBtn').addEventListener('click', function() {
    const signupSuccess = validateSignup();
    if (signupSuccess) {
      window.location.href = 'login.html';
    }
  });
});


function validateSignup() {

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  
  if (username === '' || email === '' || password === '' || confirmPassword === '') {
    alert('Please fill in all fields');
    return false;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Invalid email format');
    return false;
  }

  // ipcRenderer is directly available in the renderer process
  // window.api.send('signupData', { username, email, password });
  return true;
}