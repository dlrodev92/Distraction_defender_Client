import '../scss/scriptForm.scss';
import HourSelect from './HourSelect';
import Input from './Input';
import {useState} from 'react';
import deleteIcon from "../assets/icons/delete.svg";
import plusIcon from "../assets/icons/plus.svg";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import api from "../api/api";

function ScriptForm({weblistShare}){
    const [web, setWeb] = useState("")

    const [isCreateDefender, setCreateDefender] = useState(false)

    const [webSiteListArray, setWebSiteListArray] = useState([]);

    const [defenderForm, setDefenderForm] = useState({
        from_hour : "",
        to_hour : "",
    });

    const handleWebChange = (e) => {
        setWeb(e.target.value);
    };

    const handleDefenderForm = (e) => {
      setDefenderForm({
      ...defenderForm,
      [e.target.name]: parseInt(e.target.value, 10)});
    }


    const handleAddWeb = (e) => {
        e.preventDefault();
        setWebSiteListArray((prevWebListArray) => [...prevWebListArray, web]);
      };

    const handleRemoveWeb = (weblistToRemove) => {
        setWebSiteListArray((prevWebListArray) =>
          prevWebListArray.filter((weblist) => weblist !== weblistToRemove)
        );
      };

    const handleWebListShare = () =>{
      setWebSiteListArray((prevWebListArray) => [
        ...prevWebListArray,
        ...weblistShare.flatMap((websites) => websites),// flatmap instead of map because we want to return an array of arrays
      ])
    }

    const showWebSiteListArray = () => {
        return webSiteListArray.map((web) => (
        <div key={uuidv4()} className='website-list-container'>
            <h4>{web}</h4>
          <button className='website-list-delete-button' onClick={(e) => handleRemoveWeb(web, e)}>
            <img src={deleteIcon} alt="delete icon" />
         </button>
        </div>
        ));
      };
    
      const handleSubmitForm = async (e) => {
        e.preventDefault();
        defenderForm.websites_list = webSiteListArray;
      
        if (defenderForm.websites_list.length === 0) {
          alert("You need to add at least one website to your defender");
        } else if (defenderForm.from_hour === "" || defenderForm.to_hour === "") {
          alert("You need to add a time range to your defender");
        }
      
        try {
          const response = await api.createDefender(defenderForm);
      
          if (response.success) {
            // Descargar el script modificado después de una respuesta exitosa
            const a = document.createElement('a');
            a.href = `data:text/plain;charset=utf-8,${encodeURIComponent(response.data)}`;
            a.download = 'modified_blocker_script.py';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(a.href);
          } else {
            console.error("Error creating defender:", response.error);
            // Manejar el error de alguna manera, mostrar un mensaje, etc.
          }
        } catch (error) {
          console.error("Error creating defender:", error);
          // Manejar el error de alguna manera, mostrar un mensaje, etc.
        }
      };
    
    useEffect(() => {
        handleWebListShare();
    }, [weblistShare]);



    return(
        <div className='script-form-container'>
          <h2> Create Your Defender Here!</h2>
          {
            isCreateDefender?
            <form onSubmit={handleSubmitForm}>
                <HourSelect label="From" name="from_hour" onChange={handleDefenderForm}/>
                <HourSelect label="To" name="to_hour" onChange={handleDefenderForm}/>
                <div className='script-input-container'>
                <Input label="Websites Names" name="web" className="select-input-container" onChange={handleWebChange}/>
                <button className='websitesList-add-button' onClick={handleAddWeb}>
                    <img src={plusIcon} alt="exit icon" /> 
                </button>
                </div>
                <ul className='websites-board'>
                    {showWebSiteListArray()}
                </ul>
                <button className='script-submit-button'>Create Your Defender</button>
            </form>
            :
            <div className='circle-container'>
              <div className="circle" onClick={()=> setCreateDefender(!isCreateDefender)}>
                  <button>
                    LOGO
                  </button>
              </div>
            </div>
            
            }
        </div>
    )
}

export default ScriptForm;