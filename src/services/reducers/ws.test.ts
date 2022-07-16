import { feedReducer, initialState } from "./ws";
import {
    TWsActions,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    wsConnectionClosed,
    wsConnectionStart
} from "../actions/ws";
import { wsUrl } from "../store";
import { wsMessage } from "../../utils/mock-data";

describe("Ws feed test", () => {
    it("Default state", () => {
        expect(feedReducer(undefined, {} as TWsActions)).toEqual(initialState)
    })

    it("WS connection start", () => {
        expect(feedReducer(initialState, wsConnectionStart(wsUrl))).toEqual({
            ...initialState,
            wsConnected: false
        })
    })

    it("WS connection success", () => {
        expect(feedReducer(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual({
            ...initialState,
            wsConnected: true
        })
    })

    it("WS get message", () => {
        expect(feedReducer(initialState, { type: WS_GET_MESSAGE, payload: wsMessage })).toEqual({
            ...initialState,
            ...wsMessage,
            wsConnected: true,
            success: true
        })
    })

    it("WS connection closed", () => {
        expect(feedReducer(initialState, wsConnectionClosed())).toEqual({
            ...initialState
        })
    })
})