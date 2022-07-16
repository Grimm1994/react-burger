import { ingredientReducer, initialState, TIngredientState } from "./ingredients";
import { bun, main, sauce } from "../../utils/mock-data";
import {
    getIngredientsFailed,
    getIngredientsRequest,
    getIngredientsSuccess,
    setCurrentIngredient,
    TIngredientsActions, unsetCurrentIngredient
} from "../actions/ingredients";
import { TIngredient } from "../../utils/types";


describe("Test Ingredient reducer", () => {

    it("Default state", () => {
        expect(ingredientReducer(undefined, {} as TIngredientsActions)).toEqual(initialState)
    })

    it("Get ingredients request", () => {
        expect(ingredientReducer(initialState, getIngredientsRequest())).toEqual({
            ...initialState,
            itemsRequest: true
        })
    })

    it("Get ingredients request failed", () => {
        expect(ingredientReducer(initialState, getIngredientsFailed())).toEqual({
            ...initialState,
            itemsFailed: true
        })
    })

    it("Get ingredients request success", () => {
        const items = [main, sauce, bun]
        expect(ingredientReducer(initialState, getIngredientsSuccess(items))).toEqual({
            ...initialState,
            itemsRequest: false,
            itemsFailed: false,
            items
        })
    })

    it("Set current ingredient", () => {
        expect(ingredientReducer(initialState, setCurrentIngredient(bun))).toEqual({
            ...initialState,
            item: bun
        })
    })

    it("Unset current ingredient", () => {
        const state: TIngredientState = {
            items: [],
            itemsRequest: false,
            itemsFailed: false,
            item: bun,
        }
        expect(ingredientReducer(state, unsetCurrentIngredient())).toEqual({
            ...state,
            item: {} as TIngredient
        })
    })
})