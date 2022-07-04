import React, { FC, ReactElement } from 'react';
import BurgerIngredients from "../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../components/burger-constructor/BurgerConstructor";
import { useSelector } from "../services/hooks";
import styles from "./ingredient.module.css";
import { Rings } from "react-loader-spinner";

const Home: FC = (): ReactElement => {
    const { itemsRequest } = useSelector(( store ) => store.ingredients);

    return (
        ( itemsRequest ? (
            <Rings height={ 300 } width={ 300 } wrapperClass={ styles.loaderWrapper } color="#8585AD"/>
        ) : (
            <>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </>
        ) )
    )
};

export default Home;