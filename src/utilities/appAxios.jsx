import axios from "axios";
import { store } from "../store";
import { toast } from "react-toastify";

const appAxios = axios.create({
  baseURL: "https://premier-beetle-serhatdmkrn-5968f094.koyeb.app",
  headers: {
    "Content-Type": "application/json"
  }
});

appAxios.interceptors.request.use(
  config => {
    const token = store.getState().auth?.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
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