import API from "../../utils/api";

export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const UNSET_CURRENT_INGREDIENT = "UNSET_CURRENT_INGREDIENT";

const getIngredientsRequest = () => {
    return {
        type: GET_INGREDIENTS_REQUEST
    }
}

const getIngredientsFailed = () => {
    return {
        type: GET_INGREDIENTS_FAILED
    }
}

const getIngredientsSuccess = (data: any): any => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        items: data
    }
}

export const getIngredients = (): any => (dispatch: any) => {
    dispatch(getIngredientsRequest());

    API.getIngredients("/ingredients").then(response => {
        const { success, data } = response;

        if (success && data) {
            dispatch(getIngredientsSuccess(data));
        } else {
            dispatch(getIngredientsFailed());
        }
    }).catch(err => {
        dispatch(getIngredientsFailed());
    })
}

export const setCurrentIngredient = (item: any): any => {
    return {
        type: SET_CURRENT_INGREDIENT,
        item
    }
}

export const unsetCurrentIngredient = (): any => {
    return {
        type: UNSET_CURRENT_INGREDIENT
    }
}