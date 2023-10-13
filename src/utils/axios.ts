import axios from "axios"
import { useAuthStore } from "@/stores/auth"

const loginConfig = {
  baseURL: "http://10.11.61.29:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
}

export const DefaultAPIInstance = axios.create(loginConfig)

DefaultAPIInstance.interceptors.request.use(async (config) => {
  const authStore = useAuthStore()
  const TTEtoken = localStorage.getItem("TTEtoken")
//   if (TTEtoken) {
//     if (new Date().getTime() / 1000 > TTEtoken) {
//       const res = await AuthAPI.refreshToken()
//       authStore.refreshToken(res.data.access)
//     }
//   }

  const accessToken = localStorage.getItem("accessToken")
  if (accessToken) config.headers["authorization"] = `Bearer ${accessToken}`

  return config
})

DefaultAPIInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
   //  const originalRequest = error.config
   //  if (error.code === 401) {
   //    const res = await AuthAPI.refreshToken()
   //    originalRequest._retry = true
   //    store.commit("refreshToken", res.data.access)
   //    return axios(originalRequest)
   //  }
    return Promise.reject(error)
  },
)
