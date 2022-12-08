 import PropTypes from 'prop-types';
 import css from './Filter.module.css'

export default function Filter({ value, onChange }) {
  return (
    <div className={css.container}>
      <p className={css.text}>  
         Find contacts by name
      </p>  
      <input 
      type="text"  
      value={value} 
      onChange={onChange}
      className={css.input} />
    </div>
  );
}


  Filter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  };