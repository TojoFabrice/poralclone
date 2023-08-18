import { axiosInstance } from "../../axios/axios";

export const getInfoRecruteurRequest = async (token:any, userId: string) => {
    try {
        const response = await axiosInstance.get('/recruteur-info/get-one-recruteur/' + userId, {
            headers: {
                token: token
            }
        })

        return response
    } catch (error) {
        console.error(error);
    }
}

export const updateRecruteurQuery = async (data: any, userId: string) => {
    try {
        const response = await axiosInstance.put('/recruteur-info/update-recruteur/' + userId, data)

        return response;
    } catch (error) {
        console.error(error);
    }
}