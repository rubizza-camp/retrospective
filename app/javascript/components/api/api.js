import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

axios.defaults.withCredentials = true;

const createAPI = () => {
  let headers = {};
  if (sessionStorage.user) {
    headers = JSON.parse(sessionStorage.user);
  }

  headers['X-CSRF-Token'] = document
    .querySelector(`meta[name='csrf-token']`)
    .getAttribute('content');

  const api = applyCaseMiddleware(
    axios.create({
      baseURL: `http://localhost:3000/api/v1/`,
      timeout: 1000 * 5,
      headers
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
