import { DefaultAPIInstance } from "../utils/axios"

export const ConfigAPI = {
  getNodes() {
    return DefaultAPIInstance.get("/list-schema/")
  },
  createNode(body: any) {
   return DefaultAPIInstance.post("/create-step-template-schema/", body)
  }
}
