import { useState } from 'react';
import Input from '../components/Input';
import api from '../api/api'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useAuthContext }   from '../context/useAuthContext';
import '../scss/login.scss';
import { useEffect } from 'react';
import logo from '../assets/images/logo.webp'
import UniversalModal from '../components/UniversalModal';


const Login = () => {
  //Check the width of the login to let the app run or not
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Here we start the logic of the app
  const Navigate = useNavigate();
  
  const { dispatch } = useAuthContext();

  const [userLoginData, setUserLogin] = useState({
    username: '',
    password: '',
  });

  const handleUserLogin = (e) => {
    setUserLogin({
      ...userLoginData,
      [e.target.name]: e.target.value,
    });
  };

  const [showModal, setShowModal] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  const loginResult = await api.login(userLoginData); // Llama a la función de inicio de sesión

  if (loginResult.success) {
    const token = loginResult.data.token; 
    const refresh_token = loginResult.data.refresh_token;
    const userId = loginResult.data.user.id;

    Cookies.set('access_token', token, { expires: 7, path: '/' });
    Cookies.set('refresh_token', refresh_token, { expires: 7, path: '/' });
    Cookies.set('userId', userId, { expires: 7, path: '/' }); 
    dispatch({ type: 'LOGIN', payload: { user: userId, token: token, refreshToken: refresh_token } });
    Navigate('/dashboard');

  } else {
    alert(loginResult.error)
  }

};

//Function to check if the token is valid, very important to avoid the user to login every time

const checkToken = async () => {
  const token = Cookies.get('refresh_token');
  console.log("token:", token);

  if (token) {
    try {
      const response = await api.refreshToken(token);

      if (response.status === 200) {
        Cookies.set('refresh_token', response.data.refresh, { expires: 7, path: '/' });
        Cookies.set('access_token', response.data.access, { expires: 7, path: '/' });
        const userId = Cookies.get('user_id');

        const user = Cookies.get("user");
        dispatch({ type: 'LOGIN', payload: { user:userId, token: response.data.access, refreshToken: response.data.refresh } });

        Navigate('/dashboard');
      } else {
        Cookies.remove('refresh_token');
        Cookies.remove('access_token');
        Cookies.remove('user');
        dispatch({ type: 'LOGOUT' });
        console.log('Token expired or not valid');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  }
};

useEffect(() => {
  checkToken();
}, []);

  return (
    <div className='container'>
      
      <div className='login-container'>
        <img src={logo} alt="Distraction defender logo" />
        <form className='login-form' onSubmit={handleLogin}>
          <Input className='login-input' label='Username' name='username' onChange={handleUserLogin} />
          <Input className='login-input' label='Password' type='password' name='password' onChange={handleUserLogin} />
          <button type='submit'>Login</button>
        </form>
        <a rel='stylesheet' className='signup-form-link' onClick={() =>{ Navigate('/signup')}}>
          Signup Here
        </a>
      </div>
      {/*Here the modal info logic */}
      <button className='login-modal-info' onClick={()=>{setShowModal(true)}} >
        Important Info
      </button>
      {showModal && (
        <UniversalModal>
          <div className='login-modal-container'>
            <h2>Thanks for using this app.</h2>
            <p><strong>Very important:</strong> This is an app in development and is intended to use ONLY on your computer/laptop not in your phopne also it was made to showcase my skills in Django primarily. All data is secure, but you can use fake data like myemail@myemail.com for login and use it.</p>
            <button onClick={()=>{setShowModal(false)}}>Understood</button>
          </div>
        </UniversalModal>
      )}
      {
        screenWidth < 700 && (
          <UniversalModal>
          <div className='login-modal-container'>
            <h2>Thanks for using this app.</h2>
            <p><strong>Very important:</strong> This is an app in development and is intended to use ONLY on your computer/laptop not in your phopne so if you want to use it you can get back on your computer.</p>
          </div>
        </UniversalModal>
        )
      }
    </div>
  );
};

export default Login;