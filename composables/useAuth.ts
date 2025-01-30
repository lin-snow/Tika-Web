import type { User, UserToLogin, UserToRegister } from '@/types/models'
import { postRequest } from '@/utils/api'
import { useRouter } from 'vue-router'



export const useAuth = () => {
    const auth = useAuthStore()
    const router = useRouter()
    const toast = useToast()

    //   login
    const login = async (userToLogin: UserToLogin) => {
        try {
            const response = await postRequest<User>('user/login', userToLogin);
            if (!response) {
                throw new Error('Login request failed');
            }

            // 返回1表示登录成功
            if (response.code === 1) {
                // 解构赋值得到id, username, token
                const { id, username, token } = response.data;
                const user: User = {
                    id: id,
                    username: username,
                    token: token
                }

                // 保存数据到状态管理
                auth.setUser(user);

                // 返回首页
                console.log("登录成功");
                toast.add({
                    title: "登录成功",
                    description: "欢迎回来",
                    icon: "i-fluent-checkmark-starburst-16-filled",
                    color: "green",
                    timeout: 1000,
                })
                router.push('/');

                
            } else {
                console.log(response.msg);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // register
    const register = async (userToReigster: UserToRegister) => {
        try {
            const response = await postRequest<User>('user/register', userToReigster);
            if (!response) {
                throw new Error('Register request failed');
            }

            // 注册成功
            console.log("注册成功");
            toast.add({
                title: "注册成功",
                description: "欢迎使用Tika,请登录使用",
                icon: "i-fluent-checkmark-starburst-16-filled",
                color: "green",
                timeout: 5000,
            })
        } catch (error) {
            console.error(error);
        }
    }

    // logout
    const logout = () => {
        auth.clearUser();
    }

    return {
        login,
        register,
        logout
    }
}