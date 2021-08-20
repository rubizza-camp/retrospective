import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

axios.defaults.withCredentials = true;

const createAPI = () => {
  const api = applyCaseMiddleware(
    axios.create({
      baseURL: `http://localhost:3000/api/v1/`,
      timeout: 1000 * 5
    })
  );

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export const api = createAPI();
