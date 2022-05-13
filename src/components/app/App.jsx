import React, { useEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import "../../index.css";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";


const App = () => {
    const dispatch = useDispatch();
    const { items, itemsRequest, itemsFailed } = useSelector(store => store.ingredients);


    useEffect(() => {
        if (!items.length) dispatch(getIngredients());
    }, [dispatch, items])

    const render = () => {
        if (itemsFailed) {
            return (
                <>Что-то пошло не так...</>
            )
        }

        if (itemsRequest) {
            return (
                <>Загрузка...</>
            )
        }
        if (items.length > 0) {
            return (
                <>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </>
            )
        } else {
            return (
                <>Ингредиенты закончились =(</>
            )
        }
    }

    return (
        <>
            <AppHeader/>
            <section className={ styles.wrapper }>
                { render() }
            </section>
        </>
    );
}

export default App;
