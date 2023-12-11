import '../scss/header-dashboard.scss';
import PomodoroDashboard from './PomodoroDashboard';
import AiDashboard from './AiDashboard';


const HeaderDashboard = () =>{
    return(
            <div className='header-dashboard-container'>
                <PomodoroDashboard/>
                <AiDashboard/>
            </div>
    )
}

export default HeaderDashboard