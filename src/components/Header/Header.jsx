import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import operation from 'redux/auth/auth-operation';
import UserMenu from 'components/UserMenu/UserMenu';

const Header = () => {
  const isLogin = useSelector(authSelectors.getIsLoggedIn);
  const email = useSelector(authSelectors.getUserEmail);
  const dispatch = useDispatch();
  const handelLogOut = () => {
    dispatch(operation.logOut());
  };
  return (
    <>
      <header>
        <div className={s.Container}>
          <nav className={s.MainNav}>
            <Link className={s.Item} to="/">
              Home
            </Link>
            {isLogin && (
              <Link className={s.Item} to="/contact">
                Phonebook
              </Link>
            )}
            {!isLogin && (
              <div className={s.SignBox}>
                <Link className={s.Item} to="/login">
                  Login
                </Link>
                <Link className={s.Item} to="/register">
                  Register
                </Link>{' '}
              </div>
            )}
          </nav>
          {isLogin && <UserMenu email={email} handelLogOut={handelLogOut} />}
        </div>
      </header>
    </>
  );
};
export default Header;
