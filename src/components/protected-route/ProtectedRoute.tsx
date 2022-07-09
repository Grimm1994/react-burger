import React, { FC, useCallback, useEffect, useState } from 'react';
import { Redirect, Route } from "react-router-dom";
import { useDispatch } from "../../services/hooks";
import { getUser } from "../../services/actions/user";
import { useAuth } from "../../services/hooks/auth";
import { TProtectedRoute } from "../../utils/types";

const ProtectedRoute: FC<TProtectedRoute> = ({ children, ...rest }) => {
    const { token, isAuth, user } = useAuth();
    const dispatch = useDispatch();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = useCallback(() => {
        if (token && !user) {
            dispatch(getUser());
        }
        setUserLoaded(true)
    }, [dispatch, token, user])

    useEffect(() => {
        init();
    }, []);

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route
            { ...rest }
            render={ ({ location }) =>
                isAuth() ? (
                    children
                ) : (
                    <Redirect
                        to={ {
                            pathname: '/login',
                            state: { from: location }
                        } }
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;