import '../scss/project-item.scss'



const ProjectItem = (props) => {
    const containerStyle = {
        backgroundImage: `url(${props.url})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover',
      };

      const getProjectId = () => {
        props.handleSelectedProject()
      };

    return (
        <div className="project-item-container" style={containerStyle} onClick={getProjectId}>
            <h3>{props.title}</h3>
        </div>
    )
}

export default ProjectItem