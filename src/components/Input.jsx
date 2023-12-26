import '../scss/input.scss';

const Input = (props) => {
  return (
    <div className={props.className || 'input-container'}>
      <label>{props.label}</label>
      <input
        type={props.type || 'text'}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        accept={props.accept}
      />
    </div>
  );
};

export default Input;