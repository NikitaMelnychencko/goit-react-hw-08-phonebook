import s from './UserMenu.module.scss';

const UserMenu = ({ email, handelLogOut }) => {
  return (
    <div className={s.UserMenu}>
      <p>Hello,{email}</p>
      <button type="button" className={s.LogOut} onClick={handelLogOut}>
        Log Out
      </button>
    </div>
  );
};
export default UserMenu;
