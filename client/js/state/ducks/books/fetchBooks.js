import * as actions from "./bookSlice";
import api from "../../utils/api";

const fetchBooks = (query) => async (dispatch) => {
  dispatch(actions.loadBook());
  try {
    if (query !== "") {
      const response = await api.get(`/api/books?search=${query}`);
      dispatch(actions.readBooks(response.data));
    } else {
      dispatch(actions.readBooks([]));
    }
  } catch (err) {
    dispatch(actions.errorBooks());
  }
};

export default fetchBooks;
