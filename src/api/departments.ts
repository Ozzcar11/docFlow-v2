import { DefaultAPIInstance } from "../utils/axios"

export const DepartmentsAPI = {
  getDepartments() {
    return DefaultAPIInstance.get("/departments/")
  },
  getDepartment(id: any) {
    return DefaultAPIInstance.get(`/departments/${id}/`)
  },
  createDepartment(body: any) {
    return DefaultAPIInstance.post("/departments/create/", body)
  },
  deleteUser(body: any) {
    return DefaultAPIInstance.put("/departments/add_or_remove_users/", body)
  },
}
