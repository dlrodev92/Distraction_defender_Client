import '../scss/taskManager.scss'
import { useState } from 'react'
import ExitIcon from '../assets/icons/exit.svg';
import EditIcon from '../assets/icons/edit.svg';
import ProjectItem from './ProjectItem';
import TaskItem from './TaskItem';
import PlusIcon from '../assets/icons/plus.svg'
import AddProject from './AddProject'
import EditProject from './EditProject';


function TaskManager(){
    const [projectAdd, isProjectAdd] = useState(false);
    const [onProjecEdit, isOnProjectEdit] = useState(false);

    const toogleProjectAdd = () =>{
        isProjectAdd(!projectAdd);
    }

    const toogleProjectEdit = () =>{
        isOnProjectEdit(!onProjecEdit);
    }


    const project = "projecto"

    const containerStyle = {
        backgroundImage: `url(https://images.pexels.com/photos/189833/pexels-photo-189833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
        backgroundPosition: 'center', // Centra la imagen
        backgroundSize: 'cover', //
      };

    return(
        <div className='task-manager-container'>
            <div className='project-container'>
                <div className='header-project-container'>
                <h2>{projectAdd ? "Create Project" : "My Projects" }</h2>
                <button className='add-button' onClick={toogleProjectAdd}>
                    <img src={projectAdd ? ExitIcon : PlusIcon } alt="add-button" />
                </button>
                </div>

                {projectAdd? 
                <AddProject /> 
                :  
                <div className='item-container'>
                    <ProjectItem />
                    <ProjectItem />
                    <ProjectItem />
                </div>
                }
               
            </div>
            <div className='task-container'>
                <div className='header-task-container'>
                {
                onProjecEdit ? 

                <EditProject/>
                :
                <div className="project-image-container" style={containerStyle}>
                    <h2>{`My ${project} Task`}</h2>
                </div>
                }

                <div>
                    <button className='edit-task-button' onClick={toogleProjectEdit}>
                        <img src={EditIcon} alt="edit-button" />
                    </button>
                </div>
                </div>
                {
                onProjecEdit ?
                   null
                    :
                    <p className='project-description-p'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum aliquam nam reprehenderit 
                    suscipit tempora eum accusantium iure nihil illo eaque! Dolorum repellendus magnam adipisci, 
                    nulla unde quod consequuntur eum accusantium.
                    </p>
                }
               
                <div className='item-container'>
                    <TaskItem />
                    <TaskItem />
                    <TaskItem />
                    <TaskItem />
                    <TaskItem />
                    <TaskItem />
                </div>
               
            </div>
        </div>
    )
}

export default TaskManager;