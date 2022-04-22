import React, {useState} from 'react';
import {DragIcon, CurrencyIcon, ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import "./burger-constructor.css"
import styles from './burger-constructor.module.css';
import img from '../../images/bun-02.png';
import PropTypes from 'prop-types';
import ingredientsTypes from "../../utils/types";
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";


const BurgerConstructor = ({ ingredients }) => {
    const [isModal, setModal] = useState(false)

    const renderModal = () => {
        return (
            <Modal onClose={() => setModal(false)}>
                <OrderDetails />
            </Modal>
        )
    }

    return (
        <div className={`${styles.wrapper} pl-4 pr-4`}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={img}
            />
            <div className={styles.wrapperInner}>
                {ingredients.map(item =>
                    item.type !== 'bun' &&
                    <div className={styles.item} key={item._id}>
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

            <div className={styles.btnBlock}>
                <div className="mr-10">
                    <span className="text text_type_digits-medium mr-2">610</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large" onClick={() => setModal(true)}>
                    Оформить заказ
                </Button>
            </div>
            {isModal && renderModal()}
        </div>
    );
};


BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsTypes.isRequired)
}

export default BurgerConstructor;