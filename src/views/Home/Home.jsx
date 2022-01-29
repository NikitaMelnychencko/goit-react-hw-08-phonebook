import * as actions from 'redux/contacts/phonebook-actions';
import {
  filterContacts,
  getFilter,
  getLoading,
} from 'redux/contacts/phonebook-selectors';
import Section from 'components/Section/Section';
import Header from 'components/Header/Header';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { nanoid } from 'nanoid';
import { BallTriangle } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Home.module.scss';

const Home = () => {
  return (
    <>
      <Header />
      <Section title={'Hello friend!'}>
        <p>
          I welcome you to my notebook application. Our life is made up of
          contacts and meetings, new acquaintances and friends. And I really
          hope my application will help you save new contacts more conveniently!{' '}
        </p>
        <div>
          <strong></strong>
        </div>
      </Section>
    </>
  );
};
export default Home;
