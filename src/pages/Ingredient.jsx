import React, { useEffect } from 'react';
import styles from "./ingredient.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/IngredientDetails";
import { NotFound404 } from "./index";
import { Rings } from "react-loader-spinner";
import { setCurrentIngredient } from "../services/actions/ingredients";

const Ingredient = () => {
    const dispatch = useDispatch();
    const { items, itemsRequest, item } = useSelector(store => store.ingredients);
    const { id } = useParams();
    const ingredient = (items) ? items.find(item => item._id === id) : null;

    useEffect(() => {
        dispatch(setCurrentIngredient(ingredient))
    }, [ingredient, dispatch])

    const render = () => {
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