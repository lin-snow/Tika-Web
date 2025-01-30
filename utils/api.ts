import type { Response } from "~/types/models";

export const postRequest = async <T>(url: string, body: object) => {
    const BASE_API = useRuntimeConfig().public.baseApi;

    try {
        console.log('BASE_API:', BASE_API);
        console.log(JSON.stringify(body));
        const response: Response<T> = await $fetch(`${BASE_API}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        

        if (response.code !== 1) {
            console.log(response.msg);
            return null;
        }

        return response;
    } catch (error) {
        console.error(error);
    }
} 