import { DefaultAPIInstance } from "../utils/axios"

export const ObjectsAPI = {
  getProjects() {
    return DefaultAPIInstance.get("/projects/")
  },
  createProject(body: any) {
    return DefaultAPIInstance.post("/projects/", body)
  },
  startProject(id: string) {
    return DefaultAPIInstance.put(`/projects/${id}/start_project/`)
  },
}
