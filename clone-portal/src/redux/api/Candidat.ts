import { axiosInstance } from "../../axios/axios";

export const getInfoCandidatRequest = async (token:any, userId: string) => {
    try {
        const response = await axiosInstance.get('/candidat-info/get-one-candidat/' + userId, {
            headers: {
                token: token
            }
        })

        return response
    } catch (error) {
        console.error(error);
    }
}

export const updateCandidatQuery = async (data: any, userId: string) => {
    try {
        const response = await axiosInstance.put('/candidat-info/update-candidat/' + userId, data)

        return response;
    } catch (error: any) {
        return error.response
    }
}

export const updatePasswordRequest = async (newpassword: any, userId:string) => {
    try {
        const response = await axiosInstance.put('/candidat-info/update-password/' + userId, newpassword )
        return response
    } catch (error) {
        console.error(error);
    }
}