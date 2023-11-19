import { useState } from 'react';
import Input from '../components/Input';
import '../scss/signup.scss';

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
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleProfilePicture = (event) =>{
    event.preventDefault();
    setProfilePicture(event.target.files[0]);
  }

  const handleSubmit = (event) => {
    if (formData.password !== formData.passwordConfirm) {
      event.preventDefault();
      alert('Passwords do not match');
    } else {
      console.log(formData);
      console.log(profilePicture);
    }
    
    setFormData({
      ...formData,
      [event.target.name]: ' '
    })
  
    setProfilePicture(null);
    alert('User created successfully');
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