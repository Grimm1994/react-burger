import React from 'react';
import AppHeader from "./components/app-header/AppHeader";
import './App.css'
import BurgerIngredients from "./components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "./components/burger-constructor/BurgerConstructor";
import data from "./utils/data";

function App() {
    return (
        <>
            <AppHeader/>
            <main className="main">
                <section className="wrapper align-end">
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </section>
            </main>
        </>
    );
}

export default App;
