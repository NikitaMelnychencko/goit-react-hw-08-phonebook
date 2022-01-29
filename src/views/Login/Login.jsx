import Section from 'components/Section/Section';
import Form from 'components/Form/Form';
import Header from 'components/Header/Header';
import { useDispatch } from 'react-redux';
import operation from 'redux/auth/auth-operation';
const Login = () => {
  const dispatch = useDispatch();
  const handelSubmit = data => {
    dispatch(operation.signIn(data));
  };
  return (
    <>
      <Header />
      <Section title={'Sign in'}>
        <Form actionCallBack={handelSubmit} text={'Sign in'} />
      </Section>
    </>
  );
};
export default Login;
