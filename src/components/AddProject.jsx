import "../scss/addProject.scss";
import Input from "./Input";
const AddProject = () => {
    
    return (
        <form className="addProject-form-container">
            <Input label="Tittle"/>
            <Input label="Description"/>
            <Input type="file" label="Image" accept="image/pnj, image/jpeg, image/web"/>
            <button>
                Add Project
            </button>
        </form>
    )
}

export default AddProject