import "../scss/addProject.scss";
import Input from "./Input";
import { useState } from 'react';
import projectApi from "../api/projectsApi";

const EditProject = ({selectedProject}) => {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Check if at least one field is filled or an image is selected
        if (!projectData.title && !projectData.description && !projectImage) {
            alert("Please fill in at least one field or select an image.");
            return;
        }
    
        // Prepare project data
        const newProject = {
            title: projectData.title,
            description: projectData.description,
            image: projectImage,
        };
    
        try {
            // Call the API to update the project
            const response = await projectApi.updateProject(newProject, selectedProject.id);
    
            // Check the response status
            if (response.success) {
                // Reset form after successful submission
                setProjectData({
                    title: "",
                    description: "",
                });
                setProjectImage(null);
            } else if (response.success == false) {
                // Display an alert and log the error details
                alert('There was an error. Please try again.');
                console.error(response);
            }
        } catch (error) {
            // Handle unexpected errors (e.g., network issues)
            console.error('An unexpected error occurred:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <form className="addProject-form-container" onSubmit={handleSubmit}>
            <h2>Edit</h2>
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