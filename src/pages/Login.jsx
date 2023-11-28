import { useState } from 'react';
import Input from '../components/Input';
import api from '../api/api'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useAuthContext }   from '../context/useAuthContext';
import '../scss/login.scss';


const Login = () => {
  const Navigate = useNavigate();
  
  const { dispatch } = useAuthContext();

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

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await api.login(userLogin);

    if (response.status === 200) {
      const token = response.data.token; 
      Cookies.set('token', token,);
      dispatch({ type: 'LOGIN', payload: { user: response.data.user, token: token } });

      alert('Login successful');

      if (Cookies.get('token')) {
      setTimeout(() => {
        Navigate('/dashboard');
      }, 1000);
      }

    }
  } catch (error) {
    if (error.message === 'Invalid credentials') {
      alert('Invalid credentials, try again');
    } else {
      alert('Unexpected error occurred');
    }
  }
};

  return (
    <div className='container'>
      <div className='login-container'>
        <h1>Login</h1>
        <form className='login-form' onSubmit={handleLogin}>
          <Input className='login-input' label='Username' name='username' onChange={handleUserLogin} />
          <Input className='login-input' label='Password' type='password' name='password' onChange={handleUserLogin} />
          <button type='submit'>Login</button>
        </form>
        <a rel='stylesheet' href='#' className='signup-form-link'>
          Signup Here
        </a>
      </div>
    </div>
  );
};

export default Login;