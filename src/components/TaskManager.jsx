import '../scss/taskManager.scss'
import ProjectItem from './ProjectItem';
import TaskItem from './TaskItem';

function TaskManager(){
    return(
        <div className='task-manager-container'>
            <div className='project-container'>
                <div className='header-project-container'>

                </div>
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
            </div>
            <div className='task-container'>
                <div className='header-task-container'>

                </div>
                <TaskItem />
                <TaskItem />
                <TaskItem />
            </div>
        </div>
    )
}

export default TaskManager;