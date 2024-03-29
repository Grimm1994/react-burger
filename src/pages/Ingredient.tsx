import React, { ReactElement, useEffect } from 'react';
import styles from "./ingredient.module.css";
import { useDispatch, useSelector } from "../services/hooks";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/IngredientDetails";
import { NotFound404 } from "./index";
import { Rings } from "react-loader-spinner";
import { setCurrentIngredient } from "../services/actions/ingredients";
import { TIngredient } from "../utils/types";

const Ingredient = () => {
    const dispatch = useDispatch();
    const { items, itemsRequest, item } = useSelector((store) => store.ingredients);
    const { id } = useParams<{id?: string}>();
    const ingredient = items.find((item: TIngredient) => item._id === id);

    useEffect(() => {
        if (ingredient) {
            dispatch(setCurrentIngredient(ingredient))
        }
    }, [ingredient, dispatch])

    const render = (): ReactElement => {
        if (itemsRequest) {
            return <Rings height={ 300 } width={ 300 } wrapperClass={ styles.loaderWrapper } color="#8585AD"/>
        }

        if (item) {
            return (
                <div className={ styles.wrapper }>
                    <IngredientDetails/>
                </div>
            )
        } else {
            return <NotFound404/>
        }

    }

    return render();
};

export default Ingredient;