import { DefaultAPIInstance } from "../utils/axios"

export const UsersAPI = {
  getUsers() {
    return DefaultAPIInstance.get("/users/")
  },
  getUser(id: any) {
    return DefaultAPIInstance.get(`/users/${id}/`)
  },
  deleteUser(id: any) {
    return DefaultAPIInstance.delete(`/users/${id}/`)
  },
  createUser(body: any) {
    return DefaultAPIInstance.post("/users/", body)
  },
  changeUser(id: any, body: any) {
    return DefaultAPIInstance.put(`/users/${id}/`, body)
  },
  getUserProjects() {
    return DefaultAPIInstance.get(`/steps/user_steps/`)
  },
  getUserProject() {
    return DefaultAPIInstance.get(`/steps/user_steps/`)
  },
  toNextUser(id: any) {
    return DefaultAPIInstance.post(`/step-by-step/${id}/`)
  },
}
