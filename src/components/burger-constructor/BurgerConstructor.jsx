import React, {Component} from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './burger-constructor.module.css';
import img from '../../images/bun-02.png';
import PropTypes from 'prop-types';
import types from "../../utils/types";

class BurgerConstructor extends Component {
    render() {
        return (
            <div className={constructorStyles.wrapper}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={img}
                />
                <div className={constructorStyles.wrapperInner}>
                    {this.props.data.map(item =>
                        item.type !== 'bun' &&
                        <div className={constructorStyles.item} key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    )}
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={img}
                />

                <div className={constructorStyles.btnBlock}>
                    <div className={constructorStyles.totalPrice}>
                        <span className="text text_type_digits-medium">610</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        );
    }
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(types.isRequired)
}

export default BurgerConstructor;