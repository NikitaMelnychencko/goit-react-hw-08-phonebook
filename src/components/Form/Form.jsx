import s from './Form.module.scss';
import { Formik, Field, Form } from 'formik';
import PropTypes from 'prop-types';

const FormSign = ({ actionCallBack, text, register = false }) => {
  return (
    <>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={actionCallBack}
      >
        <Form className={s.SearchForm}>
          {register && (
            <label className={s.Form}>
              <span>Name</span>
              <Field
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="First Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob , Charles"
                required
                autoComplete="off"
              />
            </label>
          )}

          <label className={s.Form}>
            <span>Email</span>
            <Field
              type="email"
              name="email"
              pattern="^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$"
              title="Email must be built by username@hostname and can consist of letters, numbers. For example tropic21@gmail.com"
              required
              autoComplete="off"
            />
          </label>

          <label className={s.Form}>
            <span>Password</span>
            <Field
              type="password"
              name="password"
              title="Enter password"
              pattern="[0-9a-zA-Z!@#$%^&*]{7,}"
              required
              autoComplete="off"
            />
          </label>

          <button className={s.Button} type="submit">
            {text}
          </button>
        </Form>
      </Formik>
    </>
  );
};

FormSign.propTypes = {
  text: PropTypes.string.isRequired,
  onCactionCallBackhange: PropTypes.func.isRequired,
  register: PropTypes.bool,
};
export default FormSign;
