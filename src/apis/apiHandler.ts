import axiosClient from "./axiosClient"

class ApiHandler {
    execute = async <T> (
        endpoint: string,
        url:string,
        data?:any,
        method?: 'get' | 'post' | 'put' | 'delete'
    ): Promise<T> => {
        const response = await axiosClient(`/${endpoint}/${url}`,{
            method: method ?? 'get',
            data
        })
        return response as T;
    }   
}

export default new ApiHandler()