import { cartReducer, initialState, TCartState } from "./cart";
import {
    addConstructorItem,
    clearConstructor,
    deleteConstructorItem,
    setBun, setTotalSum,
    sortIngredients,
    TCartActions
} from "../actions/cart";
import { bunUniq, main, mainUniq, sauce, sauceUniq } from "../../utils/mock-data";

describe("Test cart reducer", () => {
    let state: TCartState = {
        totalSum: 222,
        items: [
            sauceUniq,
            mainUniq
        ],
        bun: bunUniq
    }

    it("Default state", () => {
        expect(cartReducer(undefined, {} as TCartActions)).toEqual(initialState)
    })

    it("Clear constructor", () => {

        expect(cartReducer(state, clearConstructor())).toEqual(initialState)
    })

    it("Set bun", () => {
        expect(cartReducer(initialState, setBun(bunUniq))).toEqual({
            ...initialState,
            bun: bunUniq
        })
    })

    it("Sort ingredients", () => {
        const items = [mainUniq, sauceUniq];
        expect(cartReducer(state, sortIngredients(items))).toEqual({
            ...state,
            items
        })
    })

    it("Add constructor item", () => {
        state = {
            totalSum: 2222,
            items: [
                sauceUniq
            ],
            bun: bunUniq
        }
        expect(cartReducer(state, addConstructorItem(mainUniq))).toEqual({
            ...state,
            items: [
                ...state.items,
                mainUniq
            ]
        })
    })

    it("Delete constructor item", () => {
        expect(cartReducer(state, deleteConstructorItem(mainUniq))).toEqual({
            ...state,
            items: [
                sauceUniq
            ]
        })
    })

    it("Set total sum", () => {
        expect(cartReducer(initialState, setTotalSum(1000))).toEqual({
            ...initialState,
            totalSum: 1000
        })
    })
})