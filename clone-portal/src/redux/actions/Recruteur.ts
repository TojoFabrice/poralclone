import { GET_INFOS_RECRUTEUR, GET_INFOS_RECRUTEUR_SUCCESS, UPDATE_RECRUTEUR, UPDATE_RECRUTEUR_SUCCESS } from "../action-type"

export interface IGetInfosRecruteur {
    type: typeof GET_INFOS_RECRUTEUR,
    token: string,
    userId: string
}

export interface IUpdateRecruteur {
    type: typeof UPDATE_RECRUTEUR,
    data: any,
    userId: string
}

////////////////////////////////////////////////////////////

export const getInfosRecruteur = (token:string, userId: string):IGetInfosRecruteur => {
    return {
        type: GET_INFOS_RECRUTEUR,
        token: token,
        userId: userId
    }
}

export const getInfosRecruteurSuccess = (data:any) => {
    return {
        type: GET_INFOS_RECRUTEUR_SUCCESS,
        payload: data
    }
}

export const updateRecruteur = (data: any, userId: string): IUpdateRecruteur => {
    return {
        type: UPDATE_RECRUTEUR,
        data: data,
        userId: userId
    }
}

export const updateRecruteurSuccess = (data: any) => {
    return {
        type: UPDATE_RECRUTEUR_SUCCESS,
        payload: data
    }
}