import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Section from 'components/Section/Section';
import { useDispatch } from 'react-redux';
import operation from 'redux/auth/auth-operation';

const Home = lazy(() =>
  import('views/Home/Home' /* webpackChunkName: "Home" */),
);

const Contact = lazy(() =>
  import('views/Contact/Contact' /* webpackChunkName: "Contact" */),
);

const ContactDetailsPage = lazy(() =>
  import(
    'views/ContactDetailsPage/ContactDetailsPage' /* webpackChunkName: "ContactDetailsPage" */
  ),
);

const Login = lazy(() =>
  import('views/Login/Login' /* webpackChunkName: "Login" */),
);

const Register = lazy(() =>
  import('views/Register/Register' /* webpackChunkName: "Register" */),
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(operation.refreshCurrentUser());
  }, []);
  return (
    <Suspense
      fallback={
        <Section>
          <BallTriangle
            heigth="100"
            width="100"
            color="#000000"
            arialLabel="loading"
            timeout={3000}
            style={{ margin: `0 auto` }}
          />
        </Section>
      }
    >
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route path="/:contactId">
          <ContactDetailsPage />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
