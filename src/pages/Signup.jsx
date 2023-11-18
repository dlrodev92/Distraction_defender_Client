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
  const handleChange = (event) =>{
    event.preventDefault();
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
    console.log(formData)
  }

  return (
    <div className='container'>
        <div className='signup-container'>
            <h1>signup</h1>
            <form className='signup-form'>
               <Input label='Name' name='name' onChange={handleChange}/>
               <Input label='Surname' name='surname' onChange={handleChange}/>
               <Input label='Username' name='username' onChange={handleChange}/>
               <Input label='Email' type='email' name='email' onChange={handleChange}/>
               <Input label='Password' type='password' name='password' onChange={handleChange}/>
               <Input label='Confirm Password' type='password' name='passwordConfirm' onChange={handleChange}/>
                <button>signup</button>
            </form>
        </div>
    </div>
  );
};

export default Signup;