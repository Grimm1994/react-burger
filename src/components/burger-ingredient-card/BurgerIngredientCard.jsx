import React, {useState} from 'react';
import styles from "../burger-ingredient-card/burger-ingredient-card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import ingredientsTypes from "../../utils/types";

const BurgerIngredientCard = ({ item }) => {
    const [isModal, setModal] = useState(false)

    const renderModal = (item) => (
        <Modal onClose={() => setModal(false)} title="Детали ингредиента">
            <IngredientDetails item={item}/>
        </Modal>
    )

    return (
        <>
            <div className={`${styles.item} mb-8`} key={item._id} onClick={() => setModal(true)}>
                <div className={styles.picture}>
                    <img src={item.image} alt={item.name}/>
                    <Counter count={1} size="default"/>
                </div>
                <div className={styles.price}>
                    <span className="text text_type_digits-default mr-2">{item.price}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <div className={styles.name}>
                    <p className="text text_type_main-default">{item.name}</p>
                </div>
            </div>
            {isModal && renderModal(item)}
        </>
    );
};

BurgerIngredientCard.propTypes = {
    item: ingredientsTypes.isRequired,
};

export default BurgerIngredientCard;