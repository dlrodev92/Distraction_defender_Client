import '../scss/weblist-dashboard.scss';
import WeblistItem from './WebListItem';
import plusIcon from "../assets/icons/plus.svg";
import exitIcon from "../assets/icons/exit.svg";
import deleteIcon from "../assets/icons/delete.svg";
import { useState } from 'react';
import Input from '../components/Input';

const WeblistDashboard = () =>{
    const [isEdit, setIsEdit] = useState(false);

    const [weblistForm, setWeblistForm] = useState({
        title: '',
        web: '',
    });

    const [webListArray, setWebListArray] = useState([]);

    const toogleEdit = () =>{
        setIsEdit(!isEdit);
    }

    const showWeblistArray = () => {
        return webListArray.map((weblist) => (
        <div key={weblist} className='weblist-web-container'>
          <a href={`${weblist}`}>
            <h5>{weblist}</h5>
          </a>
          <button className='weblist-delete-button' onClick={handleRemoveWeb}>
            <img src={deleteIcon} alt="delete icon" />
         </button>
        </div>
        ));
      };

      const handleWebListForm = (e) => {
        setWeblistForm({
        ...weblistForm,
      [e.target.name]: e.target.value,});
      };

      const handleAddWeb = (e) => {
        e.preventDefault();
        setWebListArray([...webListArray, weblistForm.web]);
      };

      const handleRemoveWeb = (e) => {
        e.preventDefault();
        webListArray.splice(webListArray.indexOf(e.target.value), 1);
        setWebListArray([...webListArray]);
      }

      const handleWebListSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log({title: weblistForm.title ,array: webListArray});
      };

    return(
    <div className='weblist-dashboard-container'>
        <div className='weblist-header'>
            {isEdit?
            (<h1>Create Weblists</h1>)
            :
            (<h1>My Weblist</h1>)
            } 
            <button onClick={toogleEdit}>
            {isEdit?
            (<img src={exitIcon} alt="plus icon" />)
            :
            (<img src={plusIcon} alt="exit icon" />)
            }   
            </button>
        </div>
    {isEdit ? 
        (
        <>
        <form className='weblist-form-container' onSubmit={handleWebListSubmit}>
            <Input label='Title' name='title' onChange={handleWebListForm}/>
            <Input label='Web' name='web'onChange={handleWebListForm}/>
            <button className='weblist-add-button' onClick={handleAddWeb}>
                <img src={plusIcon} alt="exit icon" /> 
            </button>
            <ul className='weblist-board'>
            {showWeblistArray()}
            </ul>
            <button className='weblist-submit-button' >
                Create Weblist
            </button>
        </form>
        
        </>
        )

        :

     (<>
        <WeblistItem title="Titulo1" />
        <WeblistItem title="Titulo2" />
        <WeblistItem title="Titulo1" />
        <WeblistItem title="Titulo2" />
        <WeblistItem title="Titulo1" />
        <WeblistItem title="Titulo2" />
    </>
    )}
    </div>)
}

export default WeblistDashboard