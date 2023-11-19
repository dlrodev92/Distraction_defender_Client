import UserDashboard from "../components/UserDasboard"
import PomodoroDashboard from "../components/PomodoroDashboard"
import WeblistDashboard from "../components/WeblistDashboard";
import '../scss/dashboard.scss';
import MainDashboard from "../components/mainDashboard";

function Dashboard() {

    return (
      <div className="dashboard-container">
        <UserDashboard/>
        <MainDashboard/>
        <PomodoroDashboard/>
        <WeblistDashboard/>
      </div>
    )
  }
  
  export default Dashboard