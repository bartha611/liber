import api from "../../utils/api";
import * as actions from "./commentSlice";

const populateData = (data) => ({
  READ: actions.readComment(data),
  CREATE: actions.createComment(data),
});

const fetchComments = (url, method, data, operation) => async (dispatch) => {
  dispatch(actions.loadComment());
  try {
    const response = await api({ url, method, data });
    dispatch(populateData(response.data)[operation]);
  } catch (err) {
    dispatch(actions.errorComment());
  }
};

export default fetchComments;
