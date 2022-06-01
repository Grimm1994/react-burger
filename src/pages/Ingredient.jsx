import React, { useEffect } from 'react';
import styles from "./ingredient.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import IngredientDetails from "../components/ingredient-details/IngredientDetails";
import { Home, NotFound404 } from "./index";
import { Rings } from "react-loader-spinner";
import { setCurrentIngredient, unsetCurrentIngredient } from "../services/actions/ingredients";
import PropTypes from "prop-types";
import Modal from "../components/modal/Modal";

const Ingredient = ({ location }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { items, itemsRequest, item } = useSelector(store => store.ingredients);
    const { id } = useParams();
    const ingredient = (items) ? items.find(item => item._id === id) : null;

    const { state } = location;

    useEffect(() => {
        dispatch(setCurrentIngredient(ingredient))
    }, [ingredient, dispatch])

    const closeModal = () => {
        dispatch(unsetCurrentIngredient());
        history.push("/");
    }

    const render = () => {
        if (itemsRequest) {
            return <Rings height={ 300 } width={ 300 } wrapperClass={ styles.loaderWrapper } color="#8585AD"/>
        }

        if (item) {
            if (state?.modal) {
                return (
                    <>
                        <Home/>
                        <Modal onClose={ () => closeModal() }>
                            <IngredientDetails/>
                        </Modal>
                    </>
                )
            } else {
                return (
                    <div className={ styles.wrapper }>
                        <IngredientDetails/>
                    </div>
                )
            }
        } else {
            return <NotFound404/>
        }

    }

    return render();
};

Ingredient.prototype = {
    location: PropTypes.object
}

export default Ingredient;