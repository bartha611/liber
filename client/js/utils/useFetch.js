import { useEffect } from "react";
import { useDispatch } from "react-redux";

/**
 * React hook used to fetch data from Django api
 *
 * @param {String} url - url of the api resource
 * @param {String} method - HTTP Method i.e. GET, POST, PUT, PATCH, DELETE, etc.
 * @param {Object} data - Optional data to send
 * @param {String} operation - Operation for redux state i.e. READ, PAGINATE, UPDATE, DELETE, etc.
 * @param {Function} thunkFunction - Thunk function to interact with redux state
 */

const useFetch = (url, method, data, operation, thunkFunction) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkFunction(url, method, data, operation));
  }, []);
};

export default useFetch;
