import { computed, ref } from "vue"
import { defineStore } from "pinia"

import { AuthAPI } from "@/api/auth"
import jwt_decode from "jwt-decode"

export const useAuthStore = defineStore("authApiStore", () => {
  const tokens = ref({
    accessToken: "",
    refreshToken: "",
  })
  const role = ref(null)

  const isAdmin = computed(() => {
    return role.value
  })

  async function login(body: any) {
    try {
      const res = await AuthAPI.getToken(body)
      localStorage.setItem("TTEtoken", jwt_decode(res.data.access).exp)
      localStorage.setItem("accessToken", res.data.access)
      localStorage.setItem("refreshToken", res.data.refresh)
      tokens.value.accessToken = res.data.access
      tokens.value.refreshToken = res.data.refresh
      role.value = res.data.is_admin
    } catch (e) {
      throw e
    }
  }

  function logout(body: any) {
    localStorage.removeItem("TTEtoken")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    tokens.value.accessToken = ""
    tokens.value.refreshToken = ""
    role.value = null
  }

  return {
    login,
    logout,
    isAdmin,
  }
})
