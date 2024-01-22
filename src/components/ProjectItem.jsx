import '../scss/project-item.scss'
import {motion} from 'framer-motion'


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
        <motion.div className="project-item-container" 
        style={containerStyle} 
        onClick={getProjectId}
        initial={{ opacity: 0.1, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        >
            <h3>{props.title}</h3>
        </motion.div>
    )
}

export default ProjectItem