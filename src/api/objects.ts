import { DefaultAPIInstance } from "../utils/axios"

export const ObjectsAPI = {
  getProjects() {
    return DefaultAPIInstance.get("/project/")
  },
  createProject(body: any) {
    return DefaultAPIInstance.post("/project/", body)
  },
  startProject(id: string) {
    return DefaultAPIInstance.put(`/project/${id}/start_project/`)
  },
}
