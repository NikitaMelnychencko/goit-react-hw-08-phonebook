import { useState,useRef,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Section from 'components/Section/Section';
import s from './ContactDetailsPage.module.scss';
import ContactDetailsPageItem from '../../components/ContactDetailsPageItem/ContactDetailsPageItem';
import Modal from 'components/Modal/Modal-approve';
import { nanoid } from 'nanoid';
import contactOperation from '../../redux/contacts/phonebobook-operation'
import {filterContacts,  getLoading} from 'redux/contacts/phonebook-selectors';
import { BallTriangle } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const ContactDetailsPage = () => {
  const contact = useSelector(filterContacts);
  const [user, setUser] = useState({});
  const [key, setKey] = useState([]);
  const lastStep = useRef(user);
  const onLoading = useSelector(getLoading);
  const [newFolder, setNewFolder] = useState(false);
  const [nameFolder, setNameFolder] = useState('');
  const [valueFolder, setValueFolder] = useState('');
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {   
    if (contact.length === 0){dispatch(contactOperation.fetchContactById(params.contactId))} else {
      const currentUser = contact[0]
      const arrayKey = Object.keys(currentUser)
      setKey(arrayKey)
      setUser(currentUser)
    }  
  }, [contact, dispatch, params.contactId, user]);
    useEffect(() => {   

    return () => {
     if (contact.length > 0) lastStep.current = contact[0];      
    }    
  }, [contact]);


  const updateValue = (nameType, upValue) => {
    const updatedContact = { ...user, [nameType]: upValue };
    dispatch(contactOperation.updateContacts({ contactData:updatedContact,contactId:params.contactId }));
  };
  const showForm = () => {
    setNewFolder(!newFolder);
  };
  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name folder':
        setNameFolder(value);
        break;
      case 'value':
        setValueFolder(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = () => {
    const updatedContact = { ...user, [nameFolder.toLowerCase()]: valueFolder };
    dispatch(contactOperation.updateContacts({ contactData:updatedContact,contactId:params.contactId }));
    showForm();
  };
  const deleteValue = nameType => {
    const updateUser = { ...user };
    updateUser[nameType] = null;
    const updatedContact = { ...updateUser };

    dispatch(contactOperation.updateContacts({ contactData:updatedContact,contactId:params.contactId }));
  };
  return (
    <>
      <Section title={'Edit contact'}>
        <ul className={s.FormList}>
        {key.map(
          userKey =>
            (userKey !== 'id'&&userKey !=='createdAt'&& user[userKey]!== null) && (
              <ContactDetailsPageItem
                key={nanoid()}
                name={userKey}
                value={user[userKey]}
                updateValue={updateValue}
                deleteValue={deleteValue}
                lastStep={lastStep.current[userKey]}
              />
            ),
          )}</ul>
        {onLoading && (
          <BallTriangle
            heigth="100"
            width="100"
            color="#000000"
            arialLabel="loading"
            timeout={3000}
          />
        )}
        {newFolder ? (
          <Modal onClose={showForm}>
            <div>
              <strong>Enter any value for the new field. Warning:Names-types of fields Email, Number are reserved</strong>
              <form className={s.AddNewFolderBoX} onSubmit={handleSubmit}>
                <label className={s.Item}>
                  <span>Name Folder</span>
                  <input
                    className={s.Input}
                    name="name folder"
                    type="text"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="First Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob , Charles"
                    value={nameFolder}
                    onChange={handleChange}
                  />
                </label>
                <label className={s.Item}>
                  <span>Value</span>
                  <input
                    className={s.Input}
                    name="value"
                    type="text"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="First Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob , Charles"
                    value={valueFolder}
                    onChange={handleChange}
                  />
                </label>
                <div className={s.AddBtnFieldBox}>
                  <button className={s.ApplyBtn} type="submit" aria-label='Add'>Add</button>
                  <button
                    className={s.CancelBtn}
                    type="button"
                    onClick={showForm}
                    aria-label='Cancel'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        ) : (
          <button type="button" className={s.AddField} aria-label='Add field' onClick={showForm}>
            Add field
          </button>
        )}
      </Section>
    </>
  );
};
export default ContactDetailsPage;
