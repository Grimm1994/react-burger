import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import AppHeader from "../app-header/AppHeader";
import styles from "./app.module.css";
import { ForgotPassword, Home, Ingredient, Login, NotFound404, Profile, Register, ResetPassword } from "../../pages"
import ProtectedRoute from "../protected-route/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { items } = useSelector(store => store.ingredients);


    useEffect(() => {
        !items.length && dispatch(getIngredients());
    }, [dispatch, items])

    return (
        <>
            <AppHeader/>
            <section className={ styles.wrapper }>
                <Switch>
                    <Route path="/" exact={ true }>
                        <Home/>
                    </Route>
                    <Route path="/login" exact={ true }>
                        <Login/>
                    </Route>
                    <Route path="/register" exact={ true }>
                        <Register/>
                    </Route>
                    <Route path="/forgot-password" exact={ true }>
                        <ForgotPassword/>
                    </Route>
                    <Route path="/reset-password" exact={ true }>
                        <ResetPassword/>
                    </Route>
                    <ProtectedRoute path="/profile" exact={ true }>
                        <Profile/>
                    </ProtectedRoute>
                    <Route path="/ingredients/:id" exact={ true }>
                        <Ingredient location={ location }/>
                    </Route>
                    <Route>
                        <NotFound404/>
                    </Route>
                </Switch>
            </section>

        </>
    );
}

export default App;
