import { TFeedState } from "../../utils/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";


export type TWsConnectionStart = {
    readonly type: typeof WS_CONNECTION_START,
    readonly queryString: string
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

export type TWsGetMessage = {
    readonly type: typeof WS_GET_MESSAGE,
    readonly payload: Omit<TFeedState, 'wsConnected'>;
}

export type TWsActions =
    | TWsConnectionStart
    | TWsConnectionClosed
    | TWsConnectionError
    | TWsConnectionSuccess
    | TWsGetMessage

export const wsConnectionStart = (queryString: string): TWsConnectionStart => {
    return {
        type: WS_CONNECTION_START,
        queryString
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

export const wsGetMessage = ( payload: Omit<TFeedState, 'wsConnected'> ): TWsGetMessage => {
    return {
        type: WS_GET_MESSAGE,
        payload
    }
}