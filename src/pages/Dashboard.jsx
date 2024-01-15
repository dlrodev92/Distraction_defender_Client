import UserDashboard from "../components/UserDasboard"
import HeaderDashboard from "../components/HeaderDashboard"
import WeblistDashboard from "../components/WeblistDashboard";
import '../scss/dashboard.scss';
import ScriptForm from '../components/ScriptForm';
import api from "../api/api";
import projectApi from "../api/projectsApi";
import { useState, useEffect } from "react";
import TaskManager from './../components/TaskManager';

function Dashboard() {
    const [weblistShare, setWeblistShare] = useState([])

    const [projects , setProjects] = useState([])

    const [isDashboardToogle, setIsDashboardToogle] = useState("projects");

    const handleSetWeblistShare = (value) =>{
      setWeblistShare((prev) => [...prev, value])
    }

    const [userData, setUserData] = useState({
      Username: "",
      Email: "",
      ProfilePicture: "",
    });
    const [userWeblist, setUserWeblist] = useState(null)

    // theese flags are used to force a rerender of the components
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
            ProfilePicture:`http://127.0.0.1:8000/${response.data.user.image}` //TODO: change this to the correct url
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

    const getUserProjects = async () => {
      try {
          const response = await projectApi.getProjects();
          setProjects(response.data);
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
    }

    //here we retrieve all the user data on mount

    useEffect(() =>{

        getUserData();
        setIsUserEdit(false);

    },[isUserEdit]);

    useEffect(() => {

      getUserWebList();
      setIsWeblistEdit(false);

    }, [isWeblistEdit]);


   //here we retrieve all the user projects on mount

    useEffect(() => {
      getUserProjects();
    }, []);


    return (
      <div className="dashboard-container">
        <UserDashboard userData={userData} toogleUserEdit={toogleUserEdit} />
        
        <HeaderDashboard/>

        {/*toggler*/}

        <div className="dashboard-toggler">
          <button onClick={() => setIsDashboardToogle("projects")}>
            My Projects
          </button>
          <button onClick={() => setIsDashboardToogle("defender")}>
            My Defender
          </button>
        </div>

        {isDashboardToogle === "projects"? 
         (
          <TaskManager
          projects={projects}
          setProjects={setProjects}
          />
         ):
         (<>
          <ScriptForm 
            weblistShare={weblistShare}
          />
          <WeblistDashboard 
              webListData={userWeblist}  
              isWeblistEdit={isWeblistEdit} 
              handleSetWeblistShare={handleSetWeblistShare} 
          />
       </>)
        }
      </div>
    )
  }
  
  export default Dashboard
