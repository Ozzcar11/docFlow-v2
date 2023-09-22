import axios from "axios"
// import { useAuthStore } from "../stores/login";

const loginConfig = {
  baseURL: "http://10.11.61.29:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
}

export const DefaultAPIInstance = axios.create(loginConfig)

// DefaultAPIInstance.interceptors.request.use(
//   async (config) => {
//      const authStore = useAuthStore();
//      config.headers.Authorization = authStore.token;
//     return config
//   },
//   (error) => Promise.reject(error),
// )

// DefaultAPIInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     //  const errorCode = error.response.data.code;
//     //  if (errorCode === 44 || errorCode === 45) {
//     //    const authStore = useAuthStore();
//     //    authStore.token = "";
//     //    authStore.logout();
//     //    return axios(error.config);
//     //  }
//     return Promise.reject(error)
//   },
// )
