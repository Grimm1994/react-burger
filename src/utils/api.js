const BASE_URL = 'https://norma.nomoreparties.space/api';
const API = {
    getIngredients: async (url) => {
        return await fetch(`${BASE_URL}${url}`).then(checkResponse)
    },

        createOrder: async (url, data) => {
        return await fetch(`${BASE_URL}${url}`, {
            method: "POST",
            body: JSON.stringify({
                ingredients: data
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkResponse)
    }
}

export default API;

const checkResponse = response => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(response.status);
};