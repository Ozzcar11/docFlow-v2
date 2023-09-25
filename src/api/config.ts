import { DefaultAPIInstance } from "../utils/axios"

export const ConfigAPI = {
  createNode(body: any) {
    return DefaultAPIInstance.post("/create-step-template-schema/", body)
  },
  getNodes() {
    return DefaultAPIInstance.get("/list-schema/")
  },
  getNode(body: any) {
    return DefaultAPIInstance.get(`/steps/${body}/`)
  },
  saveNode(body: any) {
    return DefaultAPIInstance.post(`/steps/`, body)
  },
  getProject() {
    return DefaultAPIInstance.get(`/project/1/`)
  },
}
