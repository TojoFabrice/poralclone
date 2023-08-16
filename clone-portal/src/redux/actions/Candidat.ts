import { GET_INFOS_CANDIDAT, GET_INFOS_CANDIDAT_SUCCESS, UPDATE_CANDIDAT, UPDATE_CANDIDAT_SUCCESS, UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS } from "../action-type"


export interface IGetInfosCandidat {
    type: typeof GET_INFOS_CANDIDAT;
    token: string;
    userId: string
}

export interface IUpdateCandidat {
    type: typeof UPDATE_CANDIDAT;
    data: any,
    userId: string
}

export interface IUpdatePassword {
    type: typeof UPDATE_PASSWORD;
    newpassword: any;
    userId: string
}


//////////////////////////////////////////////////////////////////////////////////////////

export const getInfosCandidat = (token:string, userId: string):IGetInfosCandidat => {
    return {
        type: GET_INFOS_CANDIDAT,
        token: token,
        userId: userId
    }
}

export const getInfosCandidatSuccess = (data:any) => {
    return {
        type: GET_INFOS_CANDIDAT_SUCCESS,
        payload: data
    }
}

export const updateCandidat = (data: any, userId: string): IUpdateCandidat => {
    return {
        type: UPDATE_CANDIDAT,
        data: data,
        userId: userId
    }
}

export const updateCandidatSuccess = (data: any) => {
    return {
        type: UPDATE_CANDIDAT_SUCCESS,
        payload: data
    }
}

export const updatePassword = (newpassword: any, userId: string): IUpdatePassword => {
    return {
        type: UPDATE_PASSWORD,
        newpassword: newpassword,
        userId: userId
    }
}

export const updatePasswordSuccess = (message: string) => {
    return {
        type: UPDATE_PASSWORD_SUCCESS,
        payload: message
    }
}