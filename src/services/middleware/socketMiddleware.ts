import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState } from '../types';
import {
    WS_CONNECTION_START,
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionSuccess,
    wsGetMessage
} from "../actions/ws";

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const queryString = action.queryString

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(`${wsUrl}${queryString}`);
            }
            if (socket) {

                socket.onopen = () => {
                    dispatch(wsConnectionSuccess());
                };

                socket.onerror = () => {
                    dispatch(wsConnectionError);
                };

                socket.onmessage = event => {
                    let { data } = event;
                    data = JSON.parse(data);
                    dispatch(wsGetMessage(data));
                };

                socket.onclose = () => {
                    dispatch(wsConnectionClosed());
                };
            }

            next(action);
        };
    }) as Middleware;
};