import React, {Component} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import PropTypes from "prop-types";
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

const burgerIngredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
});

BurgerIngredients.propTypes = burgerIngredientsPropTypes.isRequired;

export default BurgerIngredients;