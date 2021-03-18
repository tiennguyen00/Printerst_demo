import { trackPromise } from 'react-promise-tracker';
import axios from 'axios';
import constant from 'lodash/constant';
import history from 'history';
import { requestUrl } from '../config/request-url';
//

const DEF_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;  // http://localhost:5000 ở backend

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const createServerResponse = res => ({ status: res.status, data: res.data });

const post = (path = '', body = {}, headers = DEF_HEADERS) =>
  trackPromise(
    axiosInstance
      .post(path, body, { headers })
      .then(res => res.data)
      .catch(err => Promise.reject(err.response ? err.response.data : err)),
  );

//axiosInstance.interceptors.request.use(requestHandler);

export const requestService = { post };