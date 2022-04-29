import React, { useEffect, useReducer, useState } from "react";
import AppHeader from "../app-header/AppHeader";
import "../../index.css";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import styles from "./app.module.css";
import API from "../../utils/api";
import { AppContext } from "../../services/contexts/AppContext";
import { appReducer } from "../../services/reducers/AppReducer";


const initialState = {
    ingredients: [],
    totalSum: null,
    order: {
        number: null,
    }
}

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState, undefined);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const getIngredients = async () => {
        setIsLoading(true);

        await API.getIngredients("/ingredients").then(response => {
            const { success, data } = response;

            if (success && data) {
                dispatch({ type: "setIngredients", payload: response.data });
            } else {
                setError(true)
            }
        }).catch(err => {
            console.log(err);
            setError(true)
        })

        setIsLoading(false);
    }

    useEffect(() => {
        getIngredients()
    }, [])

    const render = () => {
        if (error) {
            return (
                <>Что-то пошло не так...</>
            )
        }

        if (isLoading) {
            return (
                <>Загрузка...</>
            )
        }
        if (state.ingredients.length > 0) {
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
        <AppContext.Provider value={{ state, dispatch }}>
            <AppHeader/>
            <main className={styles.main}>
                <section className={styles.wrapper}>
                    {render()}
                </section>
            </main>
        </AppContext.Provider>
    );
}

export default App;
