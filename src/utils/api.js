const BASE_URL = 'https://norma.nomoreparties.space/api';
const API = {
    getIngredients: async (url) => {
        return await fetch(`${ BASE_URL }${ url }`).then(checkResponse)
    },

    createOrder: async (url, data) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify({
                ingredients: data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkResponse)
    },

    createUser: async (url, data) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(checkUserResponse)
    },

    signIn: async (url, data) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(checkUserResponse)
    },

    logout: async (url) => {
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

    resetPassword: async (url, data) => {
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

    updatePassword: async (url, data) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(checkUserResponse)
    },

    updateToken: async (url, refreshToken) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            method: "POST",
            body: JSON.stringify({
                token: refreshToken
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(checkResponse)
    },

    getUser: async (url) => {
        return await fetch(`${ BASE_URL }${ url }`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ localStorage.getItem("token") }`
            }
        }).then(checkUserResponse);
    },

    updateUser: async (url, data) => {
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

const checkResponse = response => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(response.status);
};

const checkUserResponse = response => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(response.text().then(async res => JSON.parse(await res)));
};