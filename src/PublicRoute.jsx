import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import authSelectors from 'redux/auth/auth-selectors';
import PropTypes from 'prop-types';

export default function PublicRoute({
  children,
  restricted = false,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return (
    <Route {...routeProps}>
      {shouldRedirect ? <Redirect to="/" /> : children}
    </Route>
  );
}
PublicRoute.propTypes = {
  children: PropTypes.node,
  restricted: PropTypes.bool,
  routeProps: PropTypes.node,
};
