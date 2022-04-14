import React, {Component} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
import types from "../../utils/types";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

class BurgerIngredients extends Component {

    render() {
        return (
            <div>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div className={ingredientsStyles.tabs}>
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
                <div className={ingredientsStyles.wrapper}>
                    <h2 className="text text_type_main-medium">Булки</h2>
                    <div className={ingredientsStyles.wrapperInner}>
                        {this.props.data.map(item =>
                            item.type === 'bun' &&
                            <div className={ingredientsStyles.item} key={item._id}>
                                <div className={ingredientsStyles.picture}>
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={1} size="default" />
                                </div>
                                <div className={ingredientsStyles.price}>
                                    <span className="text text_type_digits-default mr-2">{item.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <div className={ingredientsStyles.name}>
                                    <p className="text text_type_main-default">{item.name}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <h2 className="text text_type_main-medium">Соусы</h2>
                    <div className={ingredientsStyles.wrapperInner}>
                        {this.props.data.map(item =>
                            item.type === 'sauce' &&
                            <div className={ingredientsStyles.item} key={item._id}>
                                <div className={ingredientsStyles.picture}>
                                    <img src={item.image} alt=""/>
                                    <Counter count={1} size="default" />
                                </div>
                                <div className={ingredientsStyles.price}>
                                    <span className="text text_type_digits-default mr-2">{item.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <div className={ingredientsStyles.name}>
                                    <p className="text text_type_main-default">{item.name}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <h2 className="text text_type_main-medium">Начинки</h2>
                    <div className={ingredientsStyles.wrapperInner}>
                        {this.props.data.map(item =>
                            item.type === 'main' &&
                            <div className={ingredientsStyles.item} key={item._id}>
                                <div className={ingredientsStyles.picture}>
                                    <img src={item.image} alt=""/>
                                    <Counter count={1} size="default" />
                                </div>
                                <div className={ingredientsStyles.price}>
                                    <span className="text text_type_digits-default mr-2">{item.price}</span>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <div className={ingredientsStyles.name}>
                                    <p className="text text_type_main-default">{item.name}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(types.isRequired)
}

export default BurgerIngredients;