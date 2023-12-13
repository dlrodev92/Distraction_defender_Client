import '../scss/scriptForm.scss';
import HourSelect from './HourSelect';
import Input from './Input';
import {useState} from 'react';
import deleteIcon from "../assets/icons/delete.svg";
import plusIcon from "../assets/icons/plus.svg";
import { v4 as uuidv4 } from 'uuid';

function ScriptForm(){
    const [web, setWeb] = useState("")

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
      [e.target.name]: e.target.value,});
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

      console.log("defender: " + defenderForm.websites_list  )



    return(
        <div className='script-form-container'>
            <h2>Get Your Distrantion Defender</h2>
            <form>
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
                <button>Create Your Defender</button>
                
            </form>
        </div>
    )
}

export default ScriptForm;