import { DefaultAPIInstance } from "../utils/axios"

export const ObjectsAPI = {
  getProjects() {
    return DefaultAPIInstance.get("/project/")
  },
  createProject(body: any) {
    return DefaultAPIInstance.post("/project/", body)
  },
}
