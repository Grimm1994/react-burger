import React, { useEffect, useState } from 'react';
import { Redirect, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../services/actions/user";
import { useAuth } from "../../services/hooks/auth";

const ProtectedRoute = ({ children, ...rest }) => {
    const { token, isAuth, user } = useAuth();
    const dispatch = useDispatch();
    const [isUserLoaded, setUserLoaded] = useState(false);

    const init = () => {
        if (token && !user) {
            dispatch(getUser());
        }
        setUserLoaded(true)
    };

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