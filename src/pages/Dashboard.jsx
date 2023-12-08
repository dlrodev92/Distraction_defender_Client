import UserDashboard from "../components/UserDasboard"
import PomodoroDashboard from "../components/PomodoroDashboard"
import WeblistDashboard from "../components/WeblistDashboard";
import '../scss/dashboard.scss';
import MainDashboard from "../components/mainDashboard";
import api from "../api/api";
import { useState, useEffect } from "react";

function Dashboard() {
    const [userData, setUserData] = useState({
      Username: "",
      Email: "",
      ProfilePicture: "",
    });

    const [userWeblist, setUserWeblist] = useState(null)

    const [isUserEdit, setIsUserEdit] = useState(false);

    const toogleUserEdit = (value) =>{
      setIsUserEdit(value);
    };

    
    const getUserData = async () => {
      try {
          const response = await api.getUserProfile();
          setUserData({
            Username: response.data.user.username,
            Email: response.data.user.email,
            Password: "",
            ProfilePicture:`http://127.0.0.1:8000/${response.data.user.image}`
          });
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
    }

    const getUserWebList = async () => {
      try {
          console.log("Fetching user web list...");
          const response = await api.getWeblist();
          setUserWeblist(response.data);
          console.log("User web list:", response.data);
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
    }

    useEffect(() =>{
        getUserData();
        setIsUserEdit(false);
    },[isUserEdit]);

    useEffect(() =>{
      getUserWebList();
      
    },[]);

    return (
      <div className="dashboard-container">
        <UserDashboard userData={userData} toogleUserEdit={toogleUserEdit} />
        <MainDashboard/>
        <PomodoroDashboard/>
        <WeblistDashboard webListData={userWeblist}/>
      </div>
    )
  }
  
  export default Dashboard