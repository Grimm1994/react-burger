import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState, TApplicationActions } from '../types';
import { wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetFeed } from "../actions/wsFeed";

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TApplicationActions) => {
            const { dispatch } = store;
            const { type } = action;

            if (type === 'WS_CONNECTION_START') {
                socket = new WebSocket(`${wsUrl}/all`);
            }
            if (socket) {

                socket.onopen = event => {
                    dispatch(wsConnectionSuccess());
                };

                socket.onerror = event => {
                    console.log(event);
                    dispatch(wsConnectionError);
                };

                socket.onmessage = event => {
                    console.log("ws data");
                    const { data } = event;
                    dispatch(wsGetFeed(data));
                };

                socket.onclose = event => {
                    dispatch(wsConnectionClosed());
                };
            }

            next(action);
        };
    }) as Middleware;
};