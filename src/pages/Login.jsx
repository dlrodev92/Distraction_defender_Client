import { useState } from 'react';
import Input from '../components/Input';
import '../scss/login.scss';

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    username: '',
    password: '',
  });
  

  const handleUserLogin = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log(userLogin);
  };

  return (
    <div className='container'>
        <div className='login-container'>
            <h1>Login</h1>
                <form className='login-form' onSubmit={handleLogin}>
                    <Input className='login-input' label='Username' name='username' onChange={handleUserLogin}/>
                    <Input className='login-input' label='Password' type='password' name='password' onChange={handleUserLogin}/>
                    <button>Login</button>
                </form>
                <a rel="stylesheet" href="#" className='signup-form-link'>Signup Here</a>
        </div>
    </div>
  );
};

export default Login;