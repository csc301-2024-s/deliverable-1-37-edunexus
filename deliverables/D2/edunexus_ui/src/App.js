import './App.css';

function App() {
  return (
      <div className="page-container">
        <div className="login-container">
          <h2>Instructor Login</h2>
          <form action="homepage.html" method="post">
            <input type="text" placeholder="Username" id="username" required/>
            <input type="password" placeholder="Password" id="password" required/>
            <button onClick="login()" id="login-button">Login</button>
          </form>
        </div>
        <script>
          function login() {
          // Placeholder for login logic
        }
        </script>
      </div>
  );
}

export default App;
