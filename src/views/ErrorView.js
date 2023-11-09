import { useRouteError } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { setError } from "../store/slices/errorSlice";

const ErrorView = () => {
  const dispatch = useDispatch();

  const error = useRouteError();
  dispatch(setError())
  console.error(error);

  return (
    <div id="error-view">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorView;