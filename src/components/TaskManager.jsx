import '../scss/taskManager.scss'
import projectsApi from '../api/projectsApi';
import { useState} from 'react'
import ExitIcon from '../assets/icons/exit.svg';
import EditIcon from '../assets/icons/edit.svg';
import ProjectItem from './ProjectItem';
import TaskItem from './TaskItem';
import PlusIcon from '../assets/icons/plus.svg'
import AddProject from './AddProject'
import EditProject from './EditProject';
import AddTask from './AddTask';
import UniversalModal from './UniversalModal';


function TaskManager({projects, setProjects, getUserProjects, }){
    const [projectAdd, isProjectAdd] = useState(false);
    const [onProjecEdit, isOnProjectEdit] = useState('');
    const[selectedProject, setSelectedProject] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const handleSelectedProject = (projectId) => {
        const project = projects.find((project) => project.id === projectId);
        setSelectedProject(project);
      };

    // const handleDeleteProject = async () =>{
    //     if(selectedProject.id !== undefined){
    //         const response = await projectsApi.deleteProject(selectedProject.id);
    //         if(response.success){
    //             const newProjects = projects.filter((project) => project.id !== selectedProject.id);
    //             setProjects(newProjects);
    //             setSelectedProject('');
    //         }
    //     }   
    // }

    const toogleProjectAdd = () =>{
        isProjectAdd(!projectAdd);
    }

    const toogleProjectEdit = () =>{
        selectedProject ? isOnProjectEdit(!onProjecEdit) : alert('Please select a project first');
    }

    const getProjects = () => {
        // Check if projects is defined and not empty
        if (projects && projects.length > 0) {
            return projects.map(project => (
                <ProjectItem key={project.id} title={project.title} url={project.image} handleSelectedProject={() => handleSelectedProject(project.id)} />
            ));
        } else {
            // Return a default message or component when there are no projects
            return <p>No projects available.</p>;
        }
    }

    const handleDeleteProject = async () => {
        if (selectedProject.id !== undefined) {
          
          setShowDeleteConfirmation(true);
          
        }
      };
    
      const handleConfirmDelete = async () => {
       
        const response = await projectsApi.deleteProject(selectedProject.id);
        if (response.success) {
          const newProjects = projects.filter((project) => project.id !== selectedProject.id);
          setProjects(newProjects);
          setSelectedProject('');
        }
        
        setShowDeleteConfirmation(false);
      };
    
      const handleCancelDelete = () => {

        setShowDeleteConfirmation(false);

      };

    const getProjectTasks = () =>{
        if (selectedProject && selectedProject.tasks && selectedProject.tasks.length > 0) {
            return selectedProject.tasks.map(task => (
                <TaskItem
                    key={task.id}
                    description={task.description}
                    created={new Date(task.created_at).toLocaleDateString()}
                    due={task.due_date}
                    label={task.label}
                    completed={task.completed}
                    selectedProject={selectedProject}
                    id={task.id}
                    setSelectedProject={setSelectedProject}
                />
            ));
        } else {
            return <h2>There are no tasks on this project yet</h2>;
        }
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

                <EditProject 
                selectedProject={selectedProject} 
                isOnProjectEdit={isOnProjectEdit} 
                onProjecEdit={onProjecEdit} 
                getUserProjects={getUserProjects} 
                setSelectedProject={setSelectedProject}
                />

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
                        getProjectTasks()
                        :
                        <h2>There are no tasks on this project yet</h2>
                    }
                    <AddTask 
                        selectedProject={selectedProject} 
                        selectedProjectTasks={selectedProject.tasks} 
                        setSelectedProject={setSelectedProject}
                    />
                </div>
                <div className='footer-task-container'>
                    <button onClick={handleDeleteProject}>Delete Project</button>

                    {/* Modal de confirmación */}
                    {showDeleteConfirmation && (
                    <UniversalModal>
                        <p>do you really want to delete this Project?</p>
                        <button onClick={handleConfirmDelete}>Sí</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </UniversalModal>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TaskManager;