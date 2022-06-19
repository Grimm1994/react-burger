import {
    SET_TOTAL_SUM,
    ADD_CONSTRUCTOR_ITEM,
    DELETE_CONSTRUCTOR_ITEM,
    SET_BUN,
    SORT_INGREDIENTS, CLEAR_CONSTRUCTOR
} from "../actions/cart";
import { TConstructorItem, TUniqueIngredient } from "../../utils/types";


const initialState: any = {
    totalSum: null,
    items: [],
    bun: {}
}

export const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case CLEAR_CONSTRUCTOR: {
            return initialState
        }

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
                items: [ ...state.items.filter((item: TUniqueIngredient) => item.uuid !== action.item.uuid)],
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