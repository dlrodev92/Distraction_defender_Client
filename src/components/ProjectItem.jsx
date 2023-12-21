import '../scss/project-item.scss'


const ProjectItem = () => {
    const containerStyle = {
        backgroundImage: `url(https://images.pexels.com/photos/189833/pexels-photo-189833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
        backgroundPosition: 'center', // Centra la imagen
        backgroundSize: 'cover', //
      };

    return (
        <div className="project-item-container" style={containerStyle}>
            <h3>Project Item</h3>
        </div>
    )
}

export default ProjectItem