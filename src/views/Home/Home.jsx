import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'redux/contacts/phonebook-actions';
import {
  filterContacts,
  getFilter,
  getLoading,
} from 'redux/contacts/phonebook-selectors';
import Section from 'components/Section/Section';
import Search from 'components/Search/Search';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import Modal from 'components/Modal/Modal-approve';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { nanoid } from 'nanoid';
import { BallTriangle } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Home.module.scss';
import contactOperation from '../../redux/contacts/phonebobook-operation';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [userIdDel, setUserIdDel] = useState(null);
  const contacts = useSelector(filterContacts);
  const onLoading = useSelector(getLoading);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contactOperation.fetchContacts());
  }, []);
  const formSubmitHandler = data => {
    let isUniqueName = contacts.find(elem => elem.name.includes(data.name));

    if (!isUniqueName) {
      const userId = { id: nanoid() };
      dispatch(contactOperation.addContacts({ ...userId, ...data }));
    } else {
      const myAlert = alert({
        title: 'Alert',
        text: `${isUniqueName.name} is already in contacts`,
      });
    }
  };
  const handleChange = e => {
    const { value } = e.currentTarget;
    dispatch(actions.addFilter(value));
  };

  const toggleModal = contactId => {
    setShowModal(!showModal);
    if (contactId) setUserIdDel(contactId);
  };

  const deleteContact = () => {
    dispatch(contactOperation.dellContacts(userIdDel));
    toggleModal();
  };
  return (
    <>
      <Section title={'Phonebook'}>
        <Search onSubmit={formSubmitHandler} />
      </Section>
      <Section title={'Contacts'}>
        <Filter value={filter} onChange={handleChange} />
        <Contacts contacts={contacts} deleteContact={toggleModal} />
        {onLoading && (
          <BallTriangle
            heigth="100"
            width="100"
            color="#000000"
            arialLabel="loading"
            timeout={3000}
          />
        )}
      </Section>

      {showModal && (
        <Modal onClose={toggleModal}>
          <>
            <button
              type="button"
              className={s.DeleteBtn}
              onClick={deleteContact}
              aria-label="Delete"
            >
              Delete
            </button>
            <button
              type="button"
              className={s.CancelBtn}
              onClick={toggleModal}
              aria-label="Cancel"
            >
              Cancel
            </button>
          </>
        </Modal>
      )}
    </>
  );
};
export default Home;
