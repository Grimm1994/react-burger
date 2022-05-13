import {
    SET_TOTAL_SUM,
    ADD_CONSTRUCTOR_ITEM,
    DELETE_CONSTRUCTOR_ITEM,
    SET_BUN,
    SORT_INGREDIENTS
} from "../actions/cart";


const initialState = {
    totalSum: null,
    items: [],
    bun: {}
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case SORT_INGREDIENTS: {
            return {
                ...state,
                items: action.items
            }
        }

        case SET_BUN: {
            return {
                ...state,
                bun: action.item
            }
        }

        case ADD_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                items: [
                    ...state.items,
                    action.item
                ],
            }
        }

        case DELETE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                items: [ ...state.items.filter(item => item.uuid !== action.item.uuid)],
            }
        }

        case SET_TOTAL_SUM: {
            return {
                ...state,
                totalSum: action.sum
            }
        }

        default: {
            return state;
        }

    }
};