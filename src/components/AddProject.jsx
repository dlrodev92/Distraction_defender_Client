import "../scss/addProject.scss";
import projectApi from "../api/projectsApi";
import Input from "./Input";
import { useState } from 'react';

const AddProject = ({projects, setProjects, toogleProjectAdd}) => {
    const [projectImage, setProjectImage] = useState(null);

    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
    });

    
    const handleChange = (event) => {
        setProjectData({
            ...projectData,
            [event.target.name]: event.target.value,
        });
    }

    const handleImageChange = (event) => {
        setProjectImage(event.target.files[0]);
    }

    const handleCreateProject = async (event) => {
        event.preventDefault();

        if (!projectData.title || !projectData.description ) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        const newProject = {
            title: projectData.title,
            description: projectData.description,
            image: projectImage,
        }
        
        const response = await projectApi.createProject(newProject);
        
        if (response.success) {
        // Reset form after submission if needed
        setProjectData({
            title: "",
            description: "",
        });
        setProjectImage(null);
        toogleProjectAdd();
        const newProjects = await projectApi.getProjects();
        setProjects(newProjects.data);
        
    }
        
    }

    return (
        <form className="addProject-form-container" onSubmit={handleCreateProject}>
            <Input label="Title" name="title" value={projectData.title} onChange={handleChange} />
            <Input label="Description" name="description" value={projectData.description} onChange={handleChange} />
            <Input type="file" label="Image" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
            <button>
                Create Project
            </button>
        </form>
    )
}

export default AddProject