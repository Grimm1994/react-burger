import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import types from "../../utils/types";
import BurgerIngredientCard from "../burger-ingredient-card/BurgerIngredientCard";


const BurgerIngredients = ({ data }) => {

    return (
        <div>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={`${styles.tabs} mb-10`}>
                <Tab value="Булки" active>
                    Булки
                </Tab>
                <Tab value="Соусы">
                    Соусы
                </Tab>
                <Tab value="Начинки">
                    Начинки
                </Tab>
            </div>
            <div className={styles.wrapper}>
                <h2 className="text text_type_main-medium mb-6">Булки</h2>
                <div className={`${styles.wrapperInner}`}>
                    {data.map(item =>
                        item.type === 'bun' &&
                        <BurgerIngredientCard key={item._id} item={item}/>
                    )}
                </div>
                <h2 className="text text_type_main-medium mb-6">Соусы</h2>
                <div className={`${styles.wrapperInner}`}>
                    {data.map(item =>
                        item.type === 'sauce' &&
                        <BurgerIngredientCard key={item._id} item={item}/>
                    )}
                </div>
                <h2 className="text text_type_main-medium mb-6">Начинки</h2>
                <div className={`${styles.wrapperInner}`}>
                    {data.map(item =>
                        item.type === 'main' &&
                        <BurgerIngredientCard key={item._id} item={item}/>
                    )}
                </div>
            </div>
        </div>
    );
};


BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(types.isRequired)
}

export default BurgerIngredients;