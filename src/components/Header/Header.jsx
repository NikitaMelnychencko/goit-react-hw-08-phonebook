import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import operation from 'redux/auth/auth-operation';

const Header = () => {
  const isLogin = useSelector(authSelectors.getUsername);
  const name = useSelector(authSelectors.getUsername);
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
            <Link className={s.Item} to="/contact">
              Phonebook
            </Link>
            {!isLogin && (
              <>
                <Link className={s.Item} to="/login">
                  Login
                </Link>
                <Link className={s.Item} to="/register">
                  Register
                </Link>{' '}
              </>
            )}
          </nav>
          {isLogin && (
            <div className={s.UserMenu}>
              <p>Hello,{name}</p>
              <button type="button" className={s.LogOut} onClick={handelLogOut}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
export default Header;
