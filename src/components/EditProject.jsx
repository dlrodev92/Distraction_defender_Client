import "../scss/addProject.scss";
import Input from "./Input";
import { useState } from 'react';
import projectApi from "../api/projectsApi";

const EditProject = ({selectedProject, isOnProjectEdit, onProjecEdit, getUserProjects, setSelectedProject}) => {
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
    });

    const [projectImage, setProjectImage] = useState(null);

    const handleChange = (event) => {
        setProjectData({
            ...projectData,
            [event.target.name]: event.target.value,
        });
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setProjectImage(file);
    }

    //function to edit the project

    const handleEditProject = async (event) => {
        event.preventDefault();
    
        let updatedData = {};
    
        if (!projectData.title && !projectData.description && !projectImage) {
            alert("Please fill in at least one of the fields");
            return;
        }
    
        if (projectData.title) {
            updatedData = {
                ...updatedData,
                title: projectData.title,
            };
        }
    
        if (projectData.description) {
            updatedData = {
                ...updatedData,
                description: projectData.description,
            };
        }
    
        if (projectImage) {
            updatedData = {
                ...updatedData,
                image: projectImage,
            };
        }
    
        try {
            
            const response = await projectApi.updateProject(updatedData, selectedProject.id);
    
            // Check the response
            if (response.success) {
                setProjectData({
                    title: '',
                    description: '',
                });
                setProjectImage(null);
                
                isOnProjectEdit(!onProjecEdit)
                
                getUserProjects();

                setSelectedProject('')

                alert("Project updated successfully");

                
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <form className="addProject-form-container" onSubmit={handleEditProject}>
            <h2> Edit </h2>
            <span>{selectedProject.title}</span>
            <Input label="Title" name="title" value={projectData.title} onChange={handleChange} />
            <Input label="Description" name="description" value={projectData.description} onChange={handleChange} />
            <Input type="file" label="Image" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
            <button type="submit">
                Edit Project
            </button>
        </form>
    )
}

export default EditProject;