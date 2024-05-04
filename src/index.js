import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals';

import App from './App';
import store from './store'
import './i18n';

import axios, { AxiosError } from 'axios';
import AuthenticateService from './core/services/auth/authenticate.service.ts';
import { UrlConstant } from './core/constants/url.constant.ts';
import { toast } from 'sonner';

const addLanguageOnly = function (config) {
  config.headers['Accept-Language'] = localStorage.getItem('language') === 'en' ? 'us' : 'lv'
  return config
}

const addLanguageAndToken = function (config) {
  config = addLanguageOnly(config)
  config.headers.Authorization = `Bearer ${AuthenticateService.getAuthData().token}`
  return config
}

axios.interceptors.request.use((config) => {
  if (UrlConstant.PUBLIC_URL.some(
    (x) => x.method === config.method?.toUpperCase() && new RegExp(x.regex).test(config.url))) {
    config = addLanguageOnly(config)
  } else if (AuthenticateService.getAuthData() !== null) {
    config = addLanguageAndToken(config)
  } else {
    config = addLanguageOnly(config)
  }
  return config
});


axios.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error.code === 'ERR_BAD_REQUEST') {
        toast.error(error.response?.data.message)
      } else {
        toast.error(error.message)
      }
    }
    return Promise.reject(error)
  }
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
