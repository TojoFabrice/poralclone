import { axiosInstance } from "../../axios/axios";

export const registerUserRequest = async (form: any) => {
    try {
        const response = await axiosInstance.post('/candidat/register', form);
        return response;
    } catch (error:any) {
        return error.response;
    }
};

export const registerRecruteurRequest = async (form: any) => {
    try {
        const response = await axiosInstance.post('/recruteur/register-recruteur', form);
        return response
    } catch (error: any) {
        return error.response;
    }
}

export const signInWithEmailPassword = async (email: string, password:string) => {
    try {
        const response = await axiosInstance.post('/candidat/login', {
            email: email,
            password: password
        })
        return response;
    } catch (error: any) {
        return error.response;
    }
} 

export const signOutRequest = async (token: any) => {
    try {
        const response = await axiosInstance.post('/candidat/logout', {}, {
            headers: {
                token: token
            }
        })
        return response
    } catch (error: any) {
        return error.response;
    }
}

export const getInfoUserConnected = async (token: any) => {

    try {
        const response = await axiosInstance.get('/dashboard', {
            headers: {
                token: token
            }
        })
        return response
    } catch (error: any) {
        return error.response;
    }
}