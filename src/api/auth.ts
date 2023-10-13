import { DefaultAPIInstance } from "../utils/axios"

export const AuthAPI = {
  getToken(body: any) {
    return DefaultAPIInstance.post("/login/", body)
  },
}
