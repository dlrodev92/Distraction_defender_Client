import '../scss/main-dashboard.scss';
import ScriptForm from './ScriptForm.jsx';'./ScriptForm.jsx';
import TaskManager from './TaskManager.jsx';'./TaskManager.jsx';

const MainDashboard = () =>{
    return(
     <div className='main-dashboard-container'>
       <ScriptForm/>
       <TaskManager/>
    </div>
    )
}

export default MainDashboard