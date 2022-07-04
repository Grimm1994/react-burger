import {
    ADD_CONSTRUCTOR_ITEM,
    CLEAR_CONSTRUCTOR,
    DELETE_CONSTRUCTOR_ITEM,
    SET_BUN,
    SET_TOTAL_SUM,
    SORT_INGREDIENTS, TCartActions
} from "../actions/cart";
import { TIngredient, TUniqueIngredient } from "../../utils/types";

type TCartState = {
    totalSum: number,
    items: ReadonlyArray<TUniqueIngredient>,
    bun: TUniqueIngredient
}

const initialState: TCartState = {
    totalSum: 0,
    items: [],
    bun: {} as TUniqueIngredient
}

export const cartReducer = (state = initialState, action: TCartActions): TCartState => {
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