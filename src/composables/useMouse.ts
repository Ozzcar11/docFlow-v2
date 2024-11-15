import { ref } from "vue"
import { throttle } from "@/utils/throttle"

export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  document.addEventListener("mousemove", throttle((e) => {
    x.value = (e as MouseEvent).clientX
    y.value = (e as MouseEvent).clientY
  }, 50))

  return { x, y }
}