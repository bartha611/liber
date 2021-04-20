import * as actions from "./reviewSlice";
import api from "../../utils/api";

const populateData = (results) => ({
  READ: actions.readReviews(results),
  UPDATE: actions.updateReview(results),
});

const fetchReviews = (url, method, data, operation) => async (dispatch) => {
  dispatch(actions.loadReview());
  try {
    const response = await api({ url, method, data });
    dispatch(populateData(response.data)[operation]);
  } catch (err) {
    dispatch(actions.errorReview());
  }
};

export default fetchReviews;
