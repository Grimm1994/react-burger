import React, {useState, Fragment, useRef, createRef} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import ingredientsTypes from "../../utils/types";
import BurgerIngredientCard from "../burger-ingredient-card/BurgerIngredientCard";


const BurgerIngredients = ({ ingredients }) => {
    const [activeTab, setActiveTab] = useState("bun");

    const anchors = ["bun", "sauce", "main",]

    const refs = useRef([]);
    refs.current = anchors.map((element, i) => refs.current[i] ?? createRef());

    const tabs = {
        "bun": "Булки",
        "sauce": "Соусы",
        "main": "Начинки",
    }

    function handleBackClick(type, ref) {
        setActiveTab(type);
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }

    const renderTabs = (tabs) => {
        return Object.keys(tabs).map((type, index) => (
            <Tab key={index} value={type} active={type === activeTab} onClick={() => handleBackClick(type, refs.current[index])}>
                {tabs[type]}
            </Tab>
        ))
    }

    const renderIngredients = (tabs, ingredients) => {
        return Object.keys(tabs).map((type, index) => (
            <Fragment key={index}>
                <h2 className="text text_type_main-medium mb-6" ref={refs.current[index]}>{tabs[type]}</h2>
                <div className={`${styles.wrapperInner}`}>
                    {
                        ingredients.filter((item) => item.type === type).map((item) => (
                            <BurgerIngredientCard key={item._id} item={item}/>
                        ))
                    }
                </div>
            </Fragment>
        ))
    }

    return (
        <div>
            <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
            <div className={`${styles.tabs} mb-10`}>
                {renderTabs(tabs)}
            </div>
            <div className={styles.wrapper}>
                {renderIngredients(tabs, ingredients)}
            </div>
        </div>
    );
};


BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsTypes.isRequired)
}

export default BurgerIngredients;