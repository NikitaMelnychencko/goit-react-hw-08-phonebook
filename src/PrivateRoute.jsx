import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import authSelectors from 'redux/auth/auth-selectors';
import PropTypes from 'prop-types';

export default function PrivateRoute({ children, ...routeProps }) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to="/login" />}
    </Route>
  );
}
PrivateRoute.propTypes = {
  children: PropTypes.node,
  routeProps: PropTypes.node,
};
