import { TFeedState } from "../../utils/types";
import {
    TWsActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "../actions/ws";

const initialState: TFeedState = {
    wsConnected: false,
    success: false,
    total: 0,
    totalToday: 0,
    orders: [],
};

export const feedReducer = ( state = initialState, action: TWsActions ): TFeedState => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                wsConnected: false,
            }

        case WS_CONNECTION_SUCCESS:
            return { ...state, wsConnected: true };

        case WS_GET_MESSAGE:
            return { ...state, ...action.payload, wsConnected: true, success: true };

        case WS_CONNECTION_CLOSED:
            return { ...initialState };

        default:
            return state;
    }
};