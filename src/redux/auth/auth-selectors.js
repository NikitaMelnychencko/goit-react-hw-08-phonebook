const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUserEmail = state => state.auth.user.email;
const getIsRefreshing = state => state.auth.isRefreshing;
const authSelectors = {
  getIsLoggedIn,
  getUserEmail,
  getIsRefreshing,
};
export default authSelectors;
