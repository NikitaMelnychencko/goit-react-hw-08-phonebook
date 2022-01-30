import Section from 'components/Section/Section';
import img from 'image/img/choise.jpg';
import s from './Home.module.scss';

const Home = () => {
  return (
    <>
      <Section title={'Hello friend!'}>
        <p className={s.WelcomeText}>
          I welcome you to my notebook application. Our life is made up of
          contacts and meetings, new acquaintances and friends. And I really
          hope my application will help you save new contacts more conveniently!{' '}
        </p>
        <img className={s.Choise} src={img} alt="Choise" />
      </Section>
    </>
  );
};
export default Home;
