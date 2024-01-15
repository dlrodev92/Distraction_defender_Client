import '../scss/taskManager.scss'
import projectsApi from '../api/projectsApi';
import { useState } from 'react'
import ExitIcon from '../assets/icons/exit.svg';
import EditIcon from '../assets/icons/edit.svg';
import ProjectItem from './ProjectItem';
import TaskItem from './TaskItem';
import PlusIcon from '../assets/icons/plus.svg'
import AddProject from './AddProject'
import EditProject from './EditProject';


function TaskManager({projects, setProjects}){
    const [projectAdd, isProjectAdd] = useState(false);
    const [onProjecEdit, isOnProjectEdit] = useState(false);
    const[selectedProject, setSelectedProject] = useState('');
    
    const handleSelectedProject = (projectId) => {
        const project = projects.find((project) => project.id === projectId);
        setSelectedProject(project);
      };

    const handleDeleteProject = async () =>{
        if(selectedProject.id !== undefined){
            const response = await projectsApi.deleteProject(selectedProject.id);
            if(response.success){
                const newProjects = projects.filter((project) => project.id !== selectedProject.id);
                setProjects(newProjects);
                setSelectedProject('');
            }
        }
            
    }
    

    const toogleProjectAdd = () =>{
        isProjectAdd(!projectAdd);
    }

    const toogleProjectEdit = () =>{
        isOnProjectEdit(!onProjecEdit);
    }

    const getProjects = () =>{
        return(
            projects.map(project => <ProjectItem key={project.id} title={project.title} url={project.image}  handleSelectedProject={() => handleSelectedProject(project.id)}/>)
        )
    }


   

    const containerStyle = {
        backgroundImage: selectedProject ? `url(${selectedProject.image})`: `url(https://i.ibb.co/X3rdqSS/Coming-So-On-1.webp)`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
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
                <AddProject 
                projects={projects}
                setProjects={setProjects}
                toogleProjectAdd={toogleProjectAdd}
                /> 
                :  
                <div className='item-container'>
                    {getProjects()}
                </div>
                }
               
            </div>
            <div className='task-container'>
                <div className='header-task-container'>
                {
                onProjecEdit ? 

                <EditProject selectedProject={selectedProject}/>
                :
                <div className="project-image-container" style={containerStyle}>
                    { selectedProject? <h2>{selectedProject.title}</h2> : <h2>{`Select Your Project`}</h2>
                        }
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
                   {selectedProject ? selectedProject.description : ""}
                    </p>
                }
               
               <div className='item-container'>
                    {selectedProject.tasks && selectedProject.tasks.length > 0 ? 
                        selectedProject.tasks.map(task => 
                        <TaskItem 
                            key={task.id} 
                            description={task.description} 
                            created={new Date(task.created_at).toLocaleDateString()} 
                            due={task.due_date} 
                            label={task.label} 
                            completeted={task.completeted}
                        />
                        ) :
                        <h2>There are no tasks on this project yet</h2>
                    }
                </div>
                <div className='footer-task-container'>
                   <button onClick={handleDeleteProject}>
                    Delete Project
                   </button>
                </div>
               
            </div>
        </div>
    )
}

export default TaskManager;