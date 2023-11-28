import '../scss/weblist-item.scss';
import deleteIcon from '../assets/icons/delete.svg';

const WeblistItem = (props) =>{
    return(
        <div className='weblistItem-container'>
             <div className='title-weblistItem-container'>
                <h3>{props.title}</h3>
                <button>
                    <img src={deleteIcon} alt="arrowdown icon" />
                </button>
             </div>
             <ul className='websites-weblistItem-container'>
                {props.websites}
             </ul>
        </div>
    )
}

export default WeblistItem