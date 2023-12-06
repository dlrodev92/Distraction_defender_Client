import { useState } from 'react';
import Input from '../components/Input';
import '../scss/signup.scss';
import api from '../api/api';

const Signup = () => {

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
  
    const dataConfirmed = {
      "username": formData.username,
      "email": formData.email,
      "name": formData.name,
      "last_name": formData.surname,
      "password": formData.password,
      "image": profilePicture // Assuming profilePicture is a File object
    };
    
    try {
      const response = await api.signup(dataConfirmed);
      
      if (response.status === 201) {
        alert('User created successfully');
        console.log(response.data);
      }
    } catch (error) {
      alert('Error:', error);
    }
  };


  return (
    <div className='container'>
        <div className='signup-container'>
            <h1>Signup</h1>
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