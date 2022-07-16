import { initialState, orderReducer } from "./order";
import { getOrderNumberFailed, getOrderNumberRequest, getOrderNumberSuccess, TOrderActions } from "../actions/order";

describe("Test order reducer", () => {
    it("Default state", () => {
        expect(orderReducer(undefined, {} as TOrderActions)).toEqual(initialState)
    })

    it("Get order number request", () => {
        expect(orderReducer(initialState, getOrderNumberRequest())).toEqual({
            ...initialState,
            orderRequest: true
        })
    })

    it("Get order number failed", () => {
        expect(orderReducer(initialState, getOrderNumberFailed())).toEqual({
            ...initialState,
            orderFailed: true
        })
    })

    it("Get order number success", () => {
        expect(orderReducer(initialState, getOrderNumberSuccess(1000))).toEqual({
            ...initialState,
            orderRequest: false,
            orderFailed: false,
            order: {
                ...initialState.order,
                number: 1000
            }
        })
    })
})