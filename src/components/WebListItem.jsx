import '../scss/weblist-item.scss';
import arrowDown from '../assets/icons/down-arrow.svg';

const WeblistItem = (props) =>{
    return(
        <div className='weblistItem-container'>
             <h3>{props.title}</h3>
             <button>
                <img src={arrowDown} alt="arrowdown icon" />
             </button>
        </div>
    )
}

export default WeblistItem