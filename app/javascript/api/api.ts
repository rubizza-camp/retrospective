import axios, { AxiosError, AxiosResponse } from "axios";
import applyCaseMiddleware from "axios-case-converter";

axios.defaults.withCredentials = true;

type HeadersInit = { [key: string]: string | null | undefined };

const createAPI = () => {
  let headers: HeadersInit = {};
  if (sessionStorage.user) {
    headers = JSON.parse(sessionStorage.user);
  }

  headers["X-CSRF-Token"] = document
    .querySelector(`meta[name='csrf-token']`)
    ?.getAttribute("content");

  const api = applyCaseMiddleware(
    axios.create({
      baseURL: "/api/v1/",
      timeout: 1000 * 5,
      headers,
    })
  );

  const onSuccess = (response: AxiosResponse) => {
    return response;
  };

  const onFail = (error: AxiosError) => {
    if (error.response) {
      alert(error.response.data.errors.fullMessages);
    } else {
      alert("Something went wrong, try again.");
    }
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export const api = createAPI();
