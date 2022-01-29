import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Search.module.scss';

const Search = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'first_name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'company':
        setCompany(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number, email,company });
    reset();
  };
  
  const reset = () => {
    setName('');
   
    setNumber('');
    setEmail('');
    setCompany('');
  };

  return (
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
      <label className={s.Form}>
          <span >Email</span>
        <input
          type="email"
          name="email"
          pattern="^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$"
          title='Email must be built by username@hostname and can consist of letters, numbers. For example tropic21@gmail.com'
          value={email}
          onChange={handleChange}
          required
        />
      </label>
      <label className={s.Form}>
          <span >Company</span>
          <input type="text"
          name="company"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={company}
          onChange={handleChange}
          required
        />
      </label>
      <button className={s.Button} type="submit" aria-label='Add contact'>
        Add contact
      </button>
    </form>
  );
};
Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Search;
