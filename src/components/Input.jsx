import '../scss/input.scss';

const Input = (props) => {
  return (
    <div className='input-container'>
      <label>{props.label}</label>
      <input
        type={props.type || 'text'}
        name={props.name}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;