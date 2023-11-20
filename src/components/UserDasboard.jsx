import '../scss/user-dashboard.scss';
import editIcon from '../assets/icons/edit.svg';
import shutdownIcon from '../assets/icons/shutdown.svg';
import saveIcon from '../assets/icons/save.svg';
import exitIcon from '../assets/icons/exit.svg';
import Input from '../components/Input';
import { useState } from 'react';
import { MagicMotion } from "react-magic-motion";
const UserDashboard = () =>{
    const [isEdit, setIsEdit] = useState(true);

    const toogleEdit = () =>{

        setIsEdit(!isEdit);
    }

    return(
    <MagicMotion transition={{ type: "spring", stiffness: 100, damping: 12 }}>
    <div className='user-dashboard-container'>
        {isEdit?
        (
        <>
            <div className="user-edit-container">
                <Input label='Username' name='username'/>
                <Input label='Email' type='email' name='email'/>
                <Input label='Password' type='password' name='password'/>
                <input className='picture-input' type="file" name="profile_picture" accept='.jpg, .png, .jpeg'/>
            </div>
            <div className='buttons-container'>
            <button className='getback-button' onClick={toogleEdit}>
                <img src={exitIcon} alt="getback"/>
            </button>
            <button className='save-button'>
                <img src={saveIcon} alt="getback"/>
            </button>
            </div>
        </>
        ) 

        :

        (
        <>
            <div className="userImage-container">
                <img src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="userImage" />
                <h2>User Name</h2>
            </div>

            <div className='buttons-container'>
            <button className='edit-button' onClick={toogleEdit}>
                <img src={editIcon} alt="editIcon"/>
            </button>
            <button className='shutdown-button'>
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