import { DefaultAPIInstance } from "../utils/axios"

export const ConfigAPI = {
  createNode(body: any) {
    return DefaultAPIInstance.post("/templates/", body)
  },
  changeNode(id: any, body: any) {
    return DefaultAPIInstance.put(`/steps/${id}/`, body)
  },
  getNodes() {
    return DefaultAPIInstance.get("/templates/")
  },
  getNode(body: any) {
    return DefaultAPIInstance.get(`/steps/${body}/`)
  },
  saveNode(body: any) {
    return DefaultAPIInstance.post(`/steps/`, body)
  },
  getProject(id: any) {
    return DefaultAPIInstance.get(`/project/${id}/`)
  },
  deleteNode(id: any) {
    return DefaultAPIInstance.delete(`/steps/${id}/`)
  },
  getLinks() {
    return DefaultAPIInstance.get(`/links/`)
  },
  setLink(body: any) {
    return DefaultAPIInstance.post(`/links/`, body)
  },
  deleteLink(id: any) {
    return DefaultAPIInstance.delete(`/links/${id}/`)
  },
  deleteScheme(id: any) {
    return DefaultAPIInstance.delete(`/templates/${id}/`)
  },
  newPlacement(id: any, body: any) {
    return DefaultAPIInstance.put(`/replacement-step-place/${id}/`, body)
  },
  deleteField(id: any) {
    return DefaultAPIInstance.delete(`/step-filed/delete/${id}/`)
  },
  setResponbleUsers(id: any, body: any) {
    return DefaultAPIInstance.put(`/responsible-step-users/${id}/`, body)
  },
}
