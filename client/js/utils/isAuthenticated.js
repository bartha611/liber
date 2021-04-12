/**
 * Function that determines whether user is authenticated
 *
 * @returns {Boolean} Returns a boolean to determine whether user is authenticated
 */
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const { exp } = JSON.parse(atob(token.split(".")[1]));
  return Number(exp) * 1000 > new Date().getTime();
};

export default isAuthenticated;
