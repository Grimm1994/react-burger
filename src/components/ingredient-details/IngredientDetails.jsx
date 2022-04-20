import React from "react";
import types from "../../utils/types";
import styles from "./ingredient-details.module.css";

function IngredientsDetails({ item }) {

    return (
        <article className={styles.card}>
            <img src={item.image} alt={item.name} className={`${styles.img} mb-4`}/>
            <p className="text text_type_main-medium mb-8">{item.name}</p>
            <ul className={styles.container}>
                <li className={`${styles.text} text text_type_main-default text_color_inactive`}>
                    Калории, ккал <span className="text text_type_digits-default">{item.calories}</span>
                </li>
                <li className={`${styles.text} text text_type_main-default text_color_inactive`}>
                    Белки, г <span className="text text_type_digits-default">{item.proteins}</span>
                </li>
                <li className={`${styles.text} text text_type_main-default text_color_inactive`}>
                    Жиры, г <span className="text text_type_digits-default">{item.fat}</span>
                </li>
                <li className={`${styles.text} text text_type_main-default text_color_inactive`}>
                    Углеводы, г <span className="text text_type_digits-default">{item.carbohydrates}</span>
                </li>
            </ul>
        </article>
    );
}

IngredientsDetails.propTypes = {
    item: types.isRequired,
};

export default IngredientsDetails;