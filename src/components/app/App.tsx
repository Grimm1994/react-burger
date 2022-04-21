import React, {useEffect, useState} from "react";
import AppHeader from "../app-header/AppHeader";
import "../../index.css";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import styles from "./app.module.css";
import {url} from "../../utils/api";

function App() {
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getIngredients()
    }, [])

    const getIngredients = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(url);

            if (response.ok) {
                const result = await response.json();

                if (result.data.length > 1) {
                    setIngredients(result.data);
                }
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const render = () => {
        if (isLoading) {
            return (
                <>Загрузка...</>
            )
        }
        if (ingredients.length > 0) {
            return (
                <>
                    <BurgerIngredients items={ingredients}/>
                    <BurgerConstructor items={ingredients}/>
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
            <main className={styles.main}>
                <section className={styles.wrapper}>
                    {render()}
                </section>
            </main>
        </>
    );
}

export default App;
