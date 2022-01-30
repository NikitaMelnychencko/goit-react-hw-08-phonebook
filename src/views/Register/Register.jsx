import Section from 'components/Section/Section';
import Form from 'components/Form/Form';
import { useDispatch } from 'react-redux';
import operation from 'redux/auth/auth-operation';

const Register = () => {
  const dispatch = useDispatch();
  const handelSubmit = data => {
    dispatch(operation.signUp(data));
  };
  return (
    <>
      <Section title={'Sing up'}>
        <Form actionCallBack={handelSubmit} text={'Sing up'} register={true} />
      </Section>
    </>
  );
};
export default Register;
