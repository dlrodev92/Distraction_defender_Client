import '../scss/project-item.scss'


const ProjectItem = (props) => {
    const containerStyle = {
        backgroundImage: `url(${props.url})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover',
      };

    return (
        <div className="project-item-container" style={containerStyle}>
            <h3>{props.title}</h3>
        </div>
    )
}

export default ProjectItem