// import { defineStore } from 'pinia'
// import { createPinia, setActivePinia } from "pinia"
// const pinia = createPinia()

// export default { store: setActivePinia(pinia) }
import type { User } from '@/types/models'
import { ref, onMounted } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
    const user = ref<User | null>(null)

    // 确保只在客户端加载本地存储数据
    onMounted(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            user.value = JSON.parse(storedUser)
        }
    })

    const getUser = () => user.value
    const getToken = () => user.value?.token || null
    const isAuthenticated = () => !!user.value

    const setUser = (newUser: User) => {
        user.value = newUser
        localStorage.setItem("user", JSON.stringify(newUser))
    }

    const clearUser = () => {
        user.value = null
        localStorage.removeItem("user")
    }

    return { user, getUser, getToken, isAuthenticated, setUser, clearUser }
})
