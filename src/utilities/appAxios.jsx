import axios from "axios";
import { store } from "../store";
import { toast } from "react-toastify";

const appAxios = axios.create({
  baseURL: "https://levaic.magneroagency.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

appAxios.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.reject(error)
);

appAxios.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;

    if (status === 429) {
      toast.error("Fazla istek atıldı. Lütfen tekrar deneyiniz.");
    } else if (status === 401 && store.getState().auth?.isAuthenticated) {
      store.dispatch({ type: "logout" });
      window.location.reload()
    } else {
      toast.error(error.response?.data?.message || "Bir hata oluştu!");
    }

    return Promise.reject(error);
  }
);

export default appAxios;