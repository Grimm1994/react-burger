import React, { FC, ReactElement, useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import AppHeader from "../app-header/AppHeader";
import styles from "./app.module.css";
import { ForgotPassword, Home, Ingredient, Login, NotFound404, Profile, Register, ResetPassword } from "../../pages"
import ProtectedRoute from "../protected-route/ProtectedRoute";
import { useDispatch, useSelector } from "../../services/hooks";
import { getIngredients, unsetCurrentIngredient } from "../../services/actions/ingredients";
import Modal from "../modal/Modal";
import { TLocation } from "../../utils/types";
import Feed from "../../pages/Feed";
import FeedDetail from "../../pages/FeedDetail";
import ProfileOrders from "../../pages/ProfileOrders";

const App: FC = (): ReactElement => {
    const location = useLocation<TLocation>();
    const history = useHistory();
    const dispatch = useDispatch();
    const { items } = useSelector((store) => store.ingredients);
    let background = location.state && location.state.background;

    const closeModal = (): void => {

        dispatch(unsetCurrentIngredient());
        history.goBack();
    }

    useEffect(() => {
        !items.length && dispatch(getIngredients());
    }, [dispatch, items])

    return (
        <>
            <AppHeader/>
            <section className={ styles.wrapper }>
                <Switch location={ background || location }>
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
                    <ProtectedRoute path="/profile/orders" exact={ true }>
                        <ProfileOrders/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders/:id" exact={ true }>
                        <FeedDetail/>
                    </ProtectedRoute>
                    <Route path="/ingredients/:id" exact={ true }>
                        <Ingredient/>
                    </Route>
                    <Route path="/feed" exact={ true }>
                        <Feed/>
                    </Route>
                    <Route path="/feed/:id" exact={ true }>
                        <FeedDetail/>
                    </Route>
                    <Route>
                        <NotFound404/>
                    </Route>
                </Switch>
                { background && <Route path="/ingredients/:id" children={
                    <Modal onClose={ closeModal }>
                        <Ingredient/>
                    </Modal>
                }/> }
                { background && <Route path="/feed/:id" children={
                    <Modal onClose={ closeModal }>
                        <FeedDetail/>
                    </Modal>
                }/> }
                { background && <Route path="/profile/orders/:id" children={
                    <Modal onClose={ closeModal }>
                        <FeedDetail/>
                    </Modal>
                }/> }
            </section>

        </>
    );
}

export default App;
