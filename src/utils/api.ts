import { TLoginState, TRegisterState, TResetPasswordState, TUserDataState } from "./types";

const BASE_URL = 'https://norma.nomoreparties.space/api';
const API = {
    getIngredients: async (url: string) => {
        return await fetch(`${ BASE_URL }${ url }`).then(checkResponse)
    },

    getOrder: async (url: string) => {
        return await fetch(`${ BASE_URL }${ url }`).then(checkResponse)
    },

    createOrder: async (url: string, data: Array<string>) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify({
                ingredients: data
            }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${ localStorage.getItem("token") }`
            }
        }).then(checkUserResponse)
    },

    createUser: async (url: string, data: TRegisterState) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(checkUserResponse)
    },

    signIn: async (url: string, data: TLoginState) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(checkUserResponse)
    },

    logout: async (url: string) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem("refreshToken")
            })
        }).then(checkResponse)
    },

    resetPassword: async (url: string, data: string) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify({
                email: data
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(checkResponse)
    },

    updatePassword: async (url: string, data: TResetPasswordState) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(checkUserResponse)
    },

    updateToken: async (url: string, refreshToken: string | null) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify({
                token: refreshToken
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(checkUserResponse)
    },

    getUser: async (url: string) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ localStorage.getItem("token") }`
            }
        }).then(checkUserResponse);
    },

    updateUser: async (url: string, data: TUserDataState) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ localStorage.getItem("token") }`
            },
            body: JSON.stringify(data)
        }).then(checkUserResponse)
    },
}

export default API;

const checkResponse = (response: Response) => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(response.status);
};

const checkUserResponse = (response: Response) => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(response.text().then(res => JSON.parse(res)));
};