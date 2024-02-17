// User part
const createUser = document.getElementById('createUser')
const checkUser = document.getElementById('checkUser')
const login = document.getElementById('login')
const usernameElement = document.getElementById('username')
const passwordElement = document.getElementById('password')
const userResponseElement = document.getElementById('userResponse')

checkUser.addEventListener('click', () => {
  const username = usernameElement.value
  window.api.checkUsername(username)
})

createUser.addEventListener('click', async() => {
  const username = usernameElement.value
  const password = passwordElement.value
  window.api.createUser(username, password)
})

login.addEventListener('click', async() => {
  const username = usernameElement.value
  const password = passwordElement.value
  window.api.login(username, password)
})
  
const counter = document.getElementById('counter')

window.api.userResponse((data) => {
  success = data[0]
  response = data[1]
  userResponseElement.innerText = response
  if (success) {
    userResponseElement.style.color = 'green'
  } else {
    userResponseElement.style.color = 'red'
  }
})
