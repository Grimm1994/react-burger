import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT,
    UNSET_CURRENT_INGREDIENT,
} from "../actions/ingredients";


const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    item: {},
}

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: false,
            }
        }

        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                itemsFailed: false,
                items: action.items,
                itemsRequest: false
            };
        }

        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                item: action.item
            }
        }

        case UNSET_CURRENT_INGREDIENT: {
            return {
                ...state,
                item: {}
            }
        }

        default: {
            return state;
        }

    }
};