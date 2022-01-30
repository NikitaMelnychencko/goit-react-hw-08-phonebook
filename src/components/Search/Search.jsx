import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Search.module.scss';
import phone from 'image/img/phone.jpg';

const Search = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'first_name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');

    setNumber('');
  };

  return (
    <>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <label className={s.Form}>
          <span>Name</span>
          <input
            type="text"
            name="first_name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="First Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob , Charles"
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={s.Form}>
          <span>Number</span>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </label>
        <button className={s.Button} type="submit" aria-label="Add contact">
          Add contact
        </button>
      </form>
      <img className={s.Phone} src={phone} alt="Phone" />
    </>
  );
};
Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Search;
