import '../scss/weblist-dashboard.scss';
import WeblistItem from './WebListItem';
import plusIcon from "../assets/icons/plus.svg";
import exitIcon from "../assets/icons/exit.svg";
import deleteIcon from "../assets/icons/delete.svg";
import { useState } from 'react';
import Input from '../components/Input';
import api from "../api/api";
import { v4 as uuidv4 } from 'uuid';

const WeblistDashboard = ({webListData, setIsWeblistEdit, isWeblistEdit}) =>{
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
          <button className='weblist-delete-button' onClick={() => handleRemoveWeb(weblist)}>
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
        setWebListArray((prevWebListArray) => [...prevWebListArray, weblistForm.web]);
      };

      const handleRemoveWeb = (weblistToRemove) => {
        setWebListArray((prevWebListArray) =>
          prevWebListArray.filter((weblist) => weblist !== weblistToRemove)
        );
      };


      const deleteWeblist = async (key) => {
        try {
          const response = await api.deleteWeblist(key);
          console.log("Weblist deleted:", response);
      
          // Only update the state if the value needs to change
          if (!isWeblistEdit) {
            setIsWeblistEdit(true);
          }
        } catch (error) {
          console.error("Error deleting weblist:", error);
        }
      };

      

      const getUserWebList = () => {
        if (webListData) {
          return webListData.map((weblist) => (
            <WeblistItem
              key={uuidv4()}
              title={weblist.title.charAt(0).toUpperCase() + weblist.title.slice(1)}
              websites={
                weblist.urls_json //if we hava an websites json
                  ? Object.values(weblist.urls_json).map((url) => (
                      <li key={uuidv4()}>{url}</li>
                    ))
                  : []
              }
              deleteWeblist={() => deleteWeblist(weblist.id)}
            />
          ));
        }
      };
      
 const createWeblist = async (e) => {
  e.preventDefault();

  const newUrlJson = {};

  webListArray.map((webList, index) => {
    newUrlJson["url" + (index + 1)] = webList;
  });

  const newWebList = {
    title: weblistForm.title,
    urls_json: newUrlJson,
  };

  try {
    if(!newWebList.title || !newWebList.urls_json){
      alert("Please, enter the right format");
    }else{
      const response = await api.createWeblist(newWebList);
      
      if (response.status === 201) {
        alert("Weblist created: " + response.data.title);
        setWebListArray([...[]]);
        setIsEdit(!isEdit);
      } else {
        console.error("Error creating weblist:", response);
      }
    }
    
    // Only update the state if the value needs to change
    if (!isWeblistEdit) {
      setIsWeblistEdit(true);
    }
  } catch (error) {
    console.error("Error creating weblist:", error);
  }
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
        <form className='weblist-form-container' onSubmit={createWeblist}>
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
        <div className='weblist-container'>
        {webListData?  getUserWebList() : <h1>There is no weblist</h1>}
        </div>
    </>
    )}
    </div>)
}

export default WeblistDashboard