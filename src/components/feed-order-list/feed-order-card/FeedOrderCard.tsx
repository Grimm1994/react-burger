import React, { FC, ReactElement } from 'react';
import styles from "./feed-order-card.module.css";

const FeedOrderCard: FC = (): ReactElement => {
    return (
        <article className={ styles.card }>
            <div className={ styles.cardHeader }>
                <div className="text text_type_digits-default">#034535</div>
                <div className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</div>
            </div>
            <h2 className="text text_type_main-medium mt-4">Death Star Starship Main бургер</h2>
        </article>
    );
};

export default FeedOrderCard;