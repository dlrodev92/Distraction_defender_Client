import { useState } from 'react';
import '../scss/login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Logging in with:', username, password);
  };

  return (
    <div className='container'>
        <div className='login-container'>
            <h1>Login</h1>
                <form className='login-form' onSubmit={handleLogin}>
                    <label htmlFor="username">Username:</label>
                    <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={handleUsernameChange}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={handlePasswordChange}
                    />
                    <button>Login</button>
                </form>
                <a rel="stylesheet" href="#" className='signup-form-link'>Signup Here</a>
        </div>
    </div>
  );
};

export default Login;