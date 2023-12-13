import "../scss/hourSelect.scss"
import { useState, useEffect } from 'react';

function HourSelect(props) {
  const [hours, setHours] = useState([]);

  useEffect(() => {
    // Función para generar las horas y actualizar el estado
    const createHours = () => {
      const newHours = [];
      for (let i = 1; i <= 24; i++) {
        newHours.push(i);
      }
      setHours(newHours);
    };

    // Llamar a la función al montar el componente
    createHours();
  }, []);

  return (
    <div className="select-container">
        <label>{props.label}</label>
        <select onChange={props.onChange} name={props.name}>
            <option>
            Hours  
            </option>
        {hours.map((hour) => (
            <option key={hour} value={hour}>
            {hour}
            </option>
        ))}
        </select>
    </div>
  );
}

export default HourSelect;