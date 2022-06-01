import React, { useState } from 'react';
import styles from "./burger-ingredient-card.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/Modal";
import IngredientDetails from "../../../ingredient-details/IngredientDetails";
import ingredientsTypes from "../../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentIngredient, unsetCurrentIngredient } from "../../../../services/actions/ingredients";
import { useDrag } from "react-dnd";
import { useHistory } from "react-router-dom";

const BurgerIngredientCard = ({ item }) => {
    const [isModal, setIsModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const constructorItems = useSelector(store => [store.cart.bun, store.cart.bun, ...store.cart.items]);


    const count = constructorItems.filter(constructorItem => constructorItem._id === item._id).length;

    const [, ref] = useDrag({
        type: "items",
        item: item,
    })

    const openModal = () => {
        history.push({
            pathname: `/ingredients/${ item._id }`,
            state: { modal: true }
        })

        setIsModal(true);
        dispatch(setCurrentIngredient(item));
    }

    const closeModal = () => {
        setIsModal(false);
        dispatch(unsetCurrentIngredient());
    }

    const renderModal = () => (
        <Modal onClose={ () => closeModal() }>
            <IngredientDetails/>
        </Modal>
    )

    return (
        <>
            <div
                className={ `${ styles.item } mb-8` }
                key={ item._id }
                onClick={ () => openModal() }
                ref={ ref }
            >
                <div className={ styles.picture }>
                    <img src={ item.image } alt={ item.name }/>
                    { count > 0 && <Counter count={ count } size="default"/> }
                </div>
                <div className={ styles.price }>
                    <span className="text text_type_digits-default mr-2">{ item.price }</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <div className={ styles.name }>
                    <p className="text text_type_main-default">{ item.name }</p>
                </div>
            </div>
            { isModal && renderModal() }
        </>
    );
};

BurgerIngredientCard.propTypes = {
    item: ingredientsTypes.isRequired,
};

export default React.memo(BurgerIngredientCard);