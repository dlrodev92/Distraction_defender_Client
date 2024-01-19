import Input from "./Input";
import{useState} from 'react';
import "../scss/addTask.scss";
import projectsApi from '../api/projectsApi';


const AddTask = ({selectedProject, selectedProjectTasks, setSelectedProject}) =>{
    const [task, setTask ] = useState({
        description: "",
        due_date: "",
        label: "",
    });

    const handleTaskChange = (e) =>{
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    }

    const handleAddTask = async (e) => {
        e.preventDefault();
        if(!task.description || !task.due_date || !task.label){
            alert("Please fill in all the fields");
        }else{
            try {
                const response = await projectsApi.createTask(task, selectedProject.id);
                console.log(response);
                if (response.success) {
                    // Crear un nuevo array de tareas y agregar la nueva tarea
                    const newTasks = [...selectedProjectTasks, response.data];
                    // Actualizar el estado con el nuevo array de tareas
                    setSelectedProject({ ...selectedProject, tasks: newTasks });
                    console.log(newTasks);
                }
            } catch (error) {
                console.log(error);
            }
         }
    };

    return(
        <form className="add-task-form">
            <Input label="Description" name="description" onChange={handleTaskChange} />
            <Input label="Label" name="label" onChange={handleTaskChange} />
            <Input type="date" label="Due Date" name="due_date" onChange={handleTaskChange} />
            <button onClick={handleAddTask}>Add Task</button>
        </form>
    )
}

export default AddTask;