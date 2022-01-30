import { lazy, Suspense, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Section from 'components/Section/Section';
import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';
import operation from 'redux/auth/auth-operation';
import PrivateRoute from 'PrivateRoute';
import PublicRoute from 'PublicRoute';
import Header from 'components/Header/Header';

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
  const isRefreshing = useSelector(authSelectors.getIsRefreshing);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(operation.refreshCurrentUser());
  }, []);
  return (
    <>
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
        <Header />
        {!isRefreshing && (
          <Switch>
            <PublicRoute exact path="/">
              <Home />
            </PublicRoute>
            <PublicRoute exact path="/login" restricted>
              <Login />
            </PublicRoute>
            <PublicRoute exact path="/register" restricted>
              <Register />
            </PublicRoute>
            <PrivateRoute exact path="/contact">
              <Contact />
            </PrivateRoute>
            <PrivateRoute path="/:contactId">
              <ContactDetailsPage />
            </PrivateRoute>
          </Switch>
        )}
      </Suspense>
    </>
  );
};

export default App;
