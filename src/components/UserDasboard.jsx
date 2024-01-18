import '../scss/user-dashboard.scss';
import editIcon from '../assets/icons/edit.svg';
import shutdownIcon from '../assets/icons/shutdown.svg';
import saveIcon from '../assets/icons/save.svg';
import exitIcon from '../assets/icons/exit.svg';
import Input from '../components/Input';
import api from '../api/api';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { useAuthContext }   from '../context/useAuthContext';
import { useState } from 'react';
// import { MagicMotion } from "react-magic-motion";


const UserDashboard = ({userData, toogleUserEdit}) =>{

  const Navigate = useNavigate();
  const { dispatch } = useAuthContext();

  //flag to check if the user is editing the profile and render the correct component  
  const [isEdit, setIsEdit] = useState(false);

  const toogleEdit = () =>{
    setIsEdit(!isEdit);
  }

  const [userImage, setUserImage] = useState(null);
  const [userFormData, setUserFormData] = useState({  
        current_password: "",
        new_password: "",
        username: "",
  });


  const handleUserImage = (event) =>{
        event.preventDefault();
        setUserImage(event.target.files[0]);
  }

  const logout = async () => {
    try {
      const token = Cookies.get('refresh_token');
      const response = await api.logout(token);
        if (response.success) {
          Cookies.remove('refresh_token');
          Cookies.remove('access_token');
          Cookies.remove('user');
          dispatch({ type: 'LOGOUT' });
          Navigate('/');
          } else {
            console.error('Error during logout:', response.error);
          }
        } catch (error) {
          console.error('An unexpected error occurred during logout:', error);
        }
    };


  const handleUserFormChange = (event) =>{
        setUserFormData({
            ...userFormData,
            [event.target.name]: event.target.value
          })
  }

  const handleSubmitEditUserForm = async (event) => {
        event.preventDefault();
        const dataConfirmed = {
          username: userFormData.username,
          current_password: userFormData.current_password,
          new_password: userFormData.new_password,
          image: userImage
        };
    
      try {
        const response = await api.updateUserProfile(dataConfirmed);
    
        if (response.success) {
          alert('User profile updated successfully!');
          setIsEdit(!isEdit);
          toogleUserEdit(true);
        } else {
          alert(response.error);
          console.log(response.error);
        }
      } catch (error) {
        alert('An error occurred while updating user profile.');
        console.error(error);
      }
    };

 
    return(
    // <MagicMotion transition={{ type: "spring", stiffness: 100, damping: 12 }}>
      <div className='user-dashboard-container'>
        {isEdit?
        (
        <>
            <form className="user-edit-container">
                <Input label='Username' name='username' onChange={handleUserFormChange}/>
                <Input label='Password' type='email' name='current_password' onChange={handleUserFormChange}/>
                <Input label='New Password' type='password' name='new_password' onChange={handleUserFormChange}/>
                <label>Image </label>
                <input className='picture-input' type="file" name="image" accept='.jpg, .png, .jpeg' onChange={handleUserImage}/>
            </form>
            <div className='buttons-container'>
            <button className='getback-button' onClick={toogleEdit}>
                <img src={exitIcon} alt="getback"/>
            </button>
            <button className='save-button'>
                <img src={saveIcon} alt="getback" onClick={handleSubmitEditUserForm}/>
            </button>
            </div>
        </>
        ) 

        :

        (
        <>
            <div className="userImage-container">
              <div className='img-wrapper'>
                <img src={userData.ProfilePicture} alt="userImage"/>
              </div>
                <h2>{userData.Username}</h2>
            </div>

            <div className='buttons-container'>
            <button className='edit-button' onClick={toogleEdit}>
                <img src={editIcon} alt="editIcon"/>
            </button>
            <button className='shutdown-button' onClick={logout}>
                <img src={shutdownIcon} alt="shutdownIcon"/>
            </button>
            </div>
        </>
        )
        }

    </div>
    // </MagicMotion>
    )
}

export default UserDashboard