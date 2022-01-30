import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Section from 'components/Section/Section';
import s from './ContactDetailsPage.module.scss';
import ContactDetailsPageItem from '../../components/ContactDetailsPageItem/ContactDetailsPageItem';
import { nanoid } from 'nanoid';
import contactOperation from '../../redux/contacts/phonebobook-operation';
import { filterContacts, getLoading } from 'redux/contacts/phonebook-selectors';
import { BallTriangle } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
const ContactDetailsPage = () => {
  const contacts = useSelector(filterContacts);
  const onLoading = useSelector(getLoading);
  const dispatch = useDispatch();
  const params = useParams();

  const [user] = contacts.filter(el => el.id === params.contactId);
  const key = Object.keys(user);
  const lastStep = useRef(user);

  useEffect(() => {
    lastStep.current = user;
  }, [user]);

  const updateValue = (nameType, upValue) => {
    const updatedContact = { ...user, [nameType]: upValue };
    delete updatedContact.id;
    dispatch(
      contactOperation.updateContacts({
        contactData: updatedContact,
        contactId: params.contactId,
      }),
    );
  };

  return (
    <>
      <Section title={'Edit contact'}>
        <ul className={s.FormList}>
          {key.map(
            userKey =>
              userKey !== 'id' &&
              userKey !== 'createdAt' &&
              user[userKey] !== null && (
                <ContactDetailsPageItem
                  key={nanoid()}
                  name={userKey}
                  value={user[userKey]}
                  updateValue={updateValue}
                  lastStep={lastStep.current[userKey]}
                />
              ),
          )}
        </ul>
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
    </>
  );
};
export default ContactDetailsPage;
