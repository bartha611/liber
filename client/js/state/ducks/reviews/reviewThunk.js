import * as actions from "./reviewSlice";
import api from "../../utils/api";

const populateData = (results) => ({
  READ: actions.readReviews(results),
  COMMENTS: actions.loadComments(results),
  CREATE: actions.createReview(results),
  UPDATE: actions.updateReview(results),
});

const fetchReviews = (
  url,
  method,
  data,
  operation,
  history = null,
  location = null
) => async (dispatch) => {
  dispatch(actions.loadReview());
  try {
    const response = await api({ url, method, data });
    dispatch(populateData(response.data)[operation]);
    if (location && history) {
      history.push(location);
    }
  } catch (err) {
    dispatch(actions.errorReview());
  }
};

export default fetchReviews;
