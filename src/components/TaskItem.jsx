import "../scss/task-item.scss";
import {useState} from "react";
import deleteIcon from "../assets/icons/delete.svg";
import saveIcon from "../assets/icons/save.svg";


const TaskItem = (props) =>{
    const [isComplete, setIsComplete] = useState(props.completed);
    const [isTaskEdit, setTaskEdit] = useState(false);

    const toogleComplete = () =>{
        setIsComplete(!isComplete);
    }

    const toogleTaskEdit = () =>{
        setTaskEdit(true);
    }

    const completedStyles = {
        backgroundColor: isComplete? "green" : "rgb(236, 58, 58)",
    }

    return(
        <div className="task-item-container">
            <div className="task-item-container-info" onClick={toogleTaskEdit}>
                <div className="task-item-container-header">
                    {isTaskEdit? 
                    <div className="task-item-container-edit">
                        <input type="text" />
                        <button>
                            <img src={saveIcon} alt="delete Icon"/>
                        </button>
                    </div>
                    : 
                    <p>{props.description}</p>
                    }
                </div>
                <div className="task-item-container-labels">
                    <h4>⏲️: {props.created}</h4>
                    <h4>📅: {props.due}</h4>
                    <h4>🖥️: {props.label}</h4>
                </div>
            </div>
            <div className="task-item-container-complete">

                <div className="completed-circle" style={completedStyles} onClick={toogleComplete}>

                </div>

                <button>
                    <img src={deleteIcon} alt="delete Icon"/>
                </button>
                
            </div>
        </div>
    )
}

export default TaskItem;