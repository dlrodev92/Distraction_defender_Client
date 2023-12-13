import UserDashboard from "../components/UserDasboard"
import HeaderDashboard from "../components/HeaderDashboard"
import WeblistDashboard from "../components/WeblistDashboard";
import '../scss/dashboard.scss';
import MainDashboard from "../components/MainDashboard";
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

    const [isWeblistEdit, setIsWeblistEdit] = useState(false);

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
          const response = await api.getWeblist();
          setUserWeblist(response.data);
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
    }

    useEffect(() =>{
        getUserData();
        setIsUserEdit(false);
    },[isUserEdit]);

    useEffect(() => {
      console.log("Fetching user weblist...");
      getUserWebList();
      console.log("User weblist effect triggered. isWeblistEdit:", isWeblistEdit);
      setIsWeblistEdit(false);
      console.log("User weblist effect: isWeblistEdit after setIsUserEdit(false):", isWeblistEdit);
    }, [isWeblistEdit]);

    return (
      <div className="dashboard-container">
        <UserDashboard userData={userData} toogleUserEdit={toogleUserEdit} />
        <MainDashboard/>
        <HeaderDashboard/>
        <WeblistDashboard webListData={userWeblist} setIsWeblistEdit={setIsWeblistEdit} isWeblistEdit={isWeblistEdit}/>
      </div>
    )
  }
  
  export default Dashboard
