import PropTypes from 'prop-types';
import s from './Filter.module.scss';

const Filter = ({ value, onChange }) => {
  return (
    <label className={s.Filter}>
      Find contacts by name
      <input
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={onChange}
        value={value}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
