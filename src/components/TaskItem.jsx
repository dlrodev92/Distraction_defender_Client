import "../scss/task-item.scss";
import { useState, useEffect } from "react";
import deleteIcon from "../assets/icons/delete.svg";
import projectsApi from '../api/projectsApi';

const TaskItem = ({ selectedProject, id, completed, description, due, label, created, setSelectedProject }) => {
    const [isComplete, setIsComplete] = useState(completed);
    const [isTaskEdit, setTaskEdit] = useState(false);

    useEffect(() => {
        setIsComplete(completed);
    }, [completed]);

    const toogleComplete = async () => {
        const response = await projectsApi.completeTask(selectedProject.id, id, { completed: !isComplete })
        if (response.success) {
            setIsComplete(!isComplete);
        }
    }


    const toogleTaskEdit = () => {
        setTaskEdit(true);
    }

    const completedStyles = {
        backgroundColor: isComplete ? "green" : "rgb(236, 58, 58)",
    }

    const handleDeleteTask = async () => {
        const response = await projectsApi.deleteTask(selectedProject.id, id);
        if (response.success) {
            const newTasks = selectedProject.tasks.filter((task) => task.id !== id);
            setSelectedProject({ ...selectedProject, tasks: newTasks });
        }
    }

    return (
        <div className="task-item-container">
            <div className="task-item-container-info" onClick={toogleTaskEdit}>
                <div className="task-item-container-header">
                    <p>{description}</p>
                </div>
                <div className="task-item-container-labels">
                    <h4>⏲️: {created}</h4>
                    <h4>📅: {due}</h4>
                    <h4>🖥️: {label}</h4>
                </div>
            </div>
            <div className="task-item-container-complete">

                <div className="completed-circle" style={completedStyles} onClick={toogleComplete}>
                </div>

                <button onClick={handleDeleteTask}>
                    <img src={deleteIcon} alt="delete Icon" />
                </button>

            </div>
        </div>
    )
}

export default TaskItem;