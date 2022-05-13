import React, { createRef, Fragment, useRef, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import BurgerIngredientCard from "./components/burger-ingredient-card/BurgerIngredientCard";
import { useSelector } from "react-redux";


const BurgerIngredients = () => {
    const { items } = useSelector(store => store.ingredients);

    const [activeTab, setActiveTab] = useState("bun");

    const anchors = ["bun", "sauce", "main",]

    const refs = useRef([]);
    refs.current = anchors.map((element, i) => refs.current[i] ?? createRef());

    const tabs = {
        "bun": "Булки",
        "sauce": "Соусы",
        "main": "Начинки",
    }
    const handleScroll = (e) => {
        const offsetTop = e.target.scrollTop + 1;
        const saucePosY = refs.current[1].current.offsetTop;
        const mainPosY = refs.current[2].current.offsetTop;

        if (offsetTop <= saucePosY) {
            setActiveTab('bun')
        } else if (offsetTop <= mainPosY) {
            setActiveTab('sauce')
        } else {
            setActiveTab('main')
        }

    }

    const renderTabs = () => {
        return Object.keys(tabs).map((type, index) => (
            <Tab key={ index } value={ type } active={ type === activeTab }
                 onClick={ () => refs.current[index].current.scrollIntoView({ behavior: 'smooth' }) }>
                { tabs[type] }
            </Tab>
        ))
    }

    const renderIngredients = () => {
        return Object.keys(tabs).map((type, index) => (
            <Fragment key={ index }>
                <h2 className="text text_type_main-medium mb-6" ref={ refs.current[index] }>{ tabs[type] }</h2>
                <div className={ `${ styles.wrapperInner }` }>
                    {
                        items?.filter((item) => item.type === type).map((item) => (
                            <BurgerIngredientCard key={ item._id } item={ item }/>
                        ))
                    }
                </div>
            </Fragment>
        ))
    }

    return (
        <div className={styles.container}>
            <h1 className={ `text text_type_main-large mb-5 ${styles.title}` }>Соберите бургер</h1>
            <div className={ `${ styles.tabs } mb-10` }>
                { renderTabs() }
            </div>
            <div className={ styles.wrapper } onScroll={ (e) => handleScroll(e) }>
                { renderIngredients() }
            </div>
        </div>
    );
};

export default BurgerIngredients;