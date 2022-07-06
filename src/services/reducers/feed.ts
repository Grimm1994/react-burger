import { TFeedState } from "../../utils/types";
import { TWsFeedActions, WS_CONNECTION_CLOSED, WS_CONNECTION_SUCCESS, WS_GET_FEED } from "../actions/wsFeed";

const initialState: TFeedState = {
    wsConnected: false,
    success: false,
    total: 0,
    totalToday: 0,
    orders: [],
};

export const feedReducer = ( state = initialState, action: TWsFeedActions ): TFeedState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return { ...state, wsConnected: true };

        case WS_GET_FEED:
            return { ...state, wsConnected: true, ...action.payload };

        case WS_CONNECTION_CLOSED:
            return { ...initialState };

        default:
            return state;
    }
};