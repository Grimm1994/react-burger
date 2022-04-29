import React, { createRef, Fragment, useContext, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import BurgerIngredientCard from "./components/burger-ingredient-card/BurgerIngredientCard";
import { AppContext } from "../../services/contexts/AppContext";


const BurgerIngredients = () => {
    const { state } = useContext(AppContext);
    const { ingredients } = state;
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

    const renderTabs = () => {
        return Object.keys(tabs).map((type, index) => (
            <Tab key={index} value={type} active={type === activeTab}
                 onClick={() => handleBackClick(type, refs.current[index])}>
                {tabs[type]}
            </Tab>
        ))
    }

    const renderIngredients = () => {
        return Object.keys(tabs).map((type, index) => (
            <Fragment key={index}>
                <h2 className="text text_type_main-medium mb-6" ref={refs.current[index]}>{tabs[type]}</h2>
                <div className={`${styles.wrapperInner}`}>
                    {
                        ingredients?.filter((item) => item.type === type).map((item) => (
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
                {renderTabs()}
            </div>
            <div className={styles.wrapper}>
                {renderIngredients()}
            </div>
        </div>
    );
};

export default BurgerIngredients;