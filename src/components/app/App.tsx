import React from 'react';
import AppHeader from "../app-header/AppHeader";
import '../../index.css'
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import data from "../../utils/data";
import styles from './app.module.css';

function App() {
    return (
        <>
            <AppHeader/>
            <main className={styles.main}>
                <section className={styles.wrapper}>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </section>
            </main>
        </>
    );
}

export default App;
