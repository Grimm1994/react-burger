import { TFeedState } from "../../utils/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_GET_FEED: "WS_GET_FEED" = "WS_GET_FEED";


export type TWsConnectionStart = {
    readonly type: typeof WS_CONNECTION_START,
}

export type TWsConnectionClosed = {
    readonly type: typeof WS_CONNECTION_CLOSED,
}

export type TWsConnectionError = {
    readonly type: typeof WS_CONNECTION_ERROR,
}

export type TWsConnectionSuccess = {
    readonly type: typeof WS_CONNECTION_SUCCESS,
}

export type TWsGetFeed = {
    readonly type: typeof WS_GET_FEED,
    readonly payload: Pick<TFeedState, 'orders'>;
}

export type TWsFeedActions =
    | TWsConnectionStart
    | TWsConnectionClosed
    | TWsConnectionError
    | TWsConnectionSuccess
    | TWsGetFeed

export const wsConnectionStart = (): TWsConnectionStart => {
    return {
        type: WS_CONNECTION_START
    }
}

export const wsConnectionClosed = (): TWsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED
    }
}

export const wsConnectionError = (): TWsConnectionError => {
    return {
        type: WS_CONNECTION_ERROR
    }
}

export const wsConnectionSuccess = (): TWsConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS
    }
}

export const wsGetFeed = ( payload: Pick<TFeedState, 'orders'> ): TWsGetFeed => {
    return {
        type: WS_GET_FEED,
        payload
    }
}