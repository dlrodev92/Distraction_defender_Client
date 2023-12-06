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
import { MagicMotion } from "react-magic-motion";
const UserDashboard = ({userData,}) =>{
    const [isEdit, setIsEdit] = useState(false);
    const [userImage, setUserImage] = useState("");

    const [userFormData, setUserFormData] = useState({  
        current_password: "",
        new_password: "",
        username: "",
     });


     const handleUserImage = (event) =>{
        event.preventDefault();
        setUserImage(event.target.files[0]);
      }

    const Navigate = useNavigate();
    const { dispatch } = useAuthContext();
    

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


    const toogleEdit = () =>{
        setIsEdit(!isEdit);
    }

    const handleUserFormChange = (event) =>{
        setUserFormData({
            ...userFormData,
            [event.target.name]: event.target.value
          })
    }

    const handleSubmitEditUserForm = async (event) => {
        event.preventDefault();
        try {
            // Ensure userFormData.image is a File object representing the uploaded image
            const dataConfirmed = {
                username: userFormData.username,
                current_password: userFormData.current_password,
                new_password: userFormData.new_password,
                image: userImage  // Set to empty sting if image is undefined
            };
    
            const response = await api.updateUserProfile(dataConfirmed);
    
            if (response.success) {
                alert('User updated successfully');
                console.log('Response data:', response.data);
                Navigate('/dashboard');
            } else {
                console.error('Error updating user profile:', response.error);
                alert('Failed to update user profile. Check the console for details.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred while updating the user profile. Check the console for details.');
        }
    };


    return(
    <MagicMotion transition={{ type: "spring", stiffness: 100, damping: 12 }}>
    <div className='user-dashboard-container'>
        {isEdit?
        (
        <>
            <form className="user-edit-container">
                <Input label='Username' name='username' onChange={handleUserFormChange}/>
                <Input label='Current Password' type='email' name='current_password' onChange={handleUserFormChange}/>
                <Input label='New Password' type='password' name='new_password' onChange={handleUserFormChange}/>
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
                <img src={userData.ProfilePicture} alt="userImage" />
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
    </MagicMotion>
    )
}

export default UserDashboard