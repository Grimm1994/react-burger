import React, { FC } from 'react';
import styles from "./burger-ingredient-card.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../../utils/types";
import { useDispatch, useSelector } from "../../../../services/hooks";
import { setCurrentIngredient } from "../../../../services/actions/ingredients";
import { useDrag } from "react-dnd";
import { useHistory, useLocation } from "react-router-dom";

const BurgerIngredientCard: FC<{ item: TIngredient }> = ( { item } ) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let location = useLocation();

    const constructorItems = useSelector(( store ) => [store.cart.bun, store.cart.bun, ...store.cart.items]);


    const count: number = constructorItems.filter(constructorItem => constructorItem._id === item._id).length;

    const [, ref] = useDrag({
        type: "items",
        item: item,
    })

    const openModal = (): void => {
        history.push({
            pathname: `/ingredients/${ item._id }`,
            state: { background: location }
        })

        dispatch(setCurrentIngredient(item));
    }


    const getTestClass = (): string => {
        switch (item.type) {
            case "bun": {
                return "drag-element-bun"
            }

            case "main": {
                return "drag-element-main"
            }

            case "sauce": {
                return "drag-element-sauce"
            }

            default: {
                return "";
            }
        }
    }

    return (
        <>
            <div
                data-test={ getTestClass() }
                className={ `${ styles.item } mb-8` }
                key={ item._id }
                onClick={ openModal }
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
        </>
    );
};

export default React.memo(BurgerIngredientCard);