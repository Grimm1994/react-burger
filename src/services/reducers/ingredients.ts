import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT, TIngredientsActions,
    UNSET_CURRENT_INGREDIENT,
} from "../actions/ingredients";
import { TIngredient } from "../../utils/types";


export type TIngredientState = {
    items: ReadonlyArray<TIngredient>,
    itemsRequest: boolean,
    itemsFailed: boolean,
    item: TIngredient;
}

export const initialState: TIngredientState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
    item: {} as TIngredient,
}

export const ingredientReducer = (state = initialState, action: TIngredientsActions): TIngredientState => {
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
                itemsFailed: true,
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
                item: {} as TIngredient
            }
        }

        default: {
            return state;
        }

    }
};