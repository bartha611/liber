import api from "../../utils/api";
import * as actions from "./authSlice";

const fetchAuth = (url, method, data, operation, history) => async (
  dispatch
) => {
  dispatch(actions.loadAuth());
  try {
    if (operation === "LOGOUT") {
      localStorage.removeItem("token");
      dispatch(actions.logoutAuth());
    } else {
      const response = await api({ url, method, data });
      localStorage.setItem("token", response.data.token);
      dispatch(actions.loginAuth(response.data));
      history.push("/");
    }
  } catch (err) {
    dispatch(actions.errorAuth());
  }
};

export default fetchAuth;
