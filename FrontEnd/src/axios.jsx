import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";
import { processLogout } from "./store/actions";
import reduxStore from "./redux";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = reduxStore.getState()?.user?.userInfo?.access_token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const status = error.response?.status || 500;
    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Unauthorized user. Please login...");
        reduxStore.dispatch(processLogout());
        return Promise.reject(error.message);
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("You don't have permisson to access here");
        return Promise.reject(error.message);
      }

      default: {
        return Promise.reject(error.message);
      }
    }
  }
);

export default instance;
