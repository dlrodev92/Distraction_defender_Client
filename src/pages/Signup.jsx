import { useState } from 'react';
import Input from '../components/Input';
import '../scss/signup.scss';
import{useNavigate} from 'react-router-dom';
import api from '../api/api';
import logo from '../assets/images/logo.webp'
import arrowIcon from '../assets/icons/exit.svg'


const Signup = () => {

  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:'',
    surname:'',
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const handleChange = (event) =>{
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleProfilePicture = (event) =>{
    event.preventDefault();
    setProfilePicture(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (formData.password !== formData.passwordConfirm || formData.password === '' || formData.passwordConfirm === '') {
      alert('Passwords do not match, please try again');
      return;
    }

    //IMPORTANT NOTE: the backend is expecting a file, not a string, so we need to check if the profile picture is a file or not
  
    const dataConfirmed = {
      username: formData.username,
      email: formData.email,
      name: formData.name,
      last_name: formData.surname,
      password: formData.password,
      image: profilePicture instanceof File ? profilePicture : null,
    };
  
    try {
      const response = await api.signup(dataConfirmed);
  
      if (response.success) {
        alert('Account created successfully. You can now log in.');
        Navigate('/')
      } else {
        alert(`Error: ${response.error}`);
        
      }
    } catch (error) {
      console.error('An error occurred during the request:', error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  
      alert(`Error: chekc the console for more information`);
  };

  return (
    <div className='container'>
        <div className='signup-container'>
          <div className='signup-container-header'>
            <img src={logo} alt="Distraction defender logo" />
            <h1>Signup</h1>
            <button>
              <img src={arrowIcon} alt="Arrow icon" onClick={() =>{ Navigate('/')}}/>
            </button>
          </div>
            <form className='signup-form' onSubmit={handleSubmit}>
               <Input label='Name' name='name' onChange={handleChange}/>
               <Input label='Surname' name='surname' onChange={handleChange}/>
               <Input label='Username' name='username' onChange={handleChange}/>
               <Input label='Email' type='email' name='email' onChange={handleChange}/>
               <Input label='Password' type='password' name='password' onChange={handleChange}/>
               <Input label='Confirm Password' type='password' name='passwordConfirm' onChange={handleChange}/>
               <label>Pick Your Profile Image</label>
               <input className='picture-input' type="file" name="profile_picture" accept='.jpg, .png, .jpeg' onChange={handleProfilePicture}/>
                <button>Signup</button>
            </form>
        </div>
    </div>
  );
};

export default Signup;