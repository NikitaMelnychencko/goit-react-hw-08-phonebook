import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from './Contacts.module.scss';

const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <li className={s.Contact}>
      <Link className={s.Link} to={`/${id}`}>
        <p>
          {name}:{number}
        </p>
        
      </Link>
      <button onClick={() => deleteContact(id)} aria-label='Delete'>Delete</button>
    </li>
  );
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default Contact;
