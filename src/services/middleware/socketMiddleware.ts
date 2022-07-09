import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types';
import { TSocketMiddlewareActions } from "../../utils/types";

export const socketMiddleware = ( wsUrl: string, wsActions: TSocketMiddlewareActions ): Middleware => {
    return ( ( store: MiddlewareAPI<AppDispatch, RootState> ) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const { onInit, onOpen, onError, onMessage, onClose } = wsActions;
            const queryString = action.queryString

            if (type === onInit) {
                socket = new WebSocket(`${ wsUrl }${ queryString }`);
            }
            if (socket) {

                socket.onopen = () => {
                    dispatch({
                        type: onOpen
                    });
                };

                socket.onerror = () => {
                    dispatch({
                        type: onError
                    });
                };

                socket.onmessage = event => {
                    let { data } = event;
                    data = JSON.parse(data);
                    dispatch({
                        type: onMessage,
                        payload: data
                    });
                };

                socket.onclose = () => {
                    dispatch({
                        type: onClose
                    });
                };
            }

            next(action);
        };
    } ) as Middleware;
};