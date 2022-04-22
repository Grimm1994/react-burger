const URL = 'https://norma.nomoreparties.space/api';
export default {
    getIngredients: () => fetch(`${URL}/ingredients`)
}