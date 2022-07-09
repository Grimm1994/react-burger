import React, { FC, ReactElement } from 'react';
import styles from "./feed-order-card.module.css";
import { TWsFeedOrder } from "../../../utils/types";
import { convertDate } from "../../../utils/date";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../../services/hooks";
import { useHistory, useLocation } from "react-router-dom";
import { getIngredients } from "../../../services/selectors/ingredientsSelector";

const FeedOrderCard: FC<{ order: TWsFeedOrder }> = ( { order } ): ReactElement => {
    const { number, createdAt, name, ingredients, status } = order;
    const { items } = useSelector(store => store.ingredients);
    const history = useHistory();
    let location = useLocation();
    const orderIngredients = getIngredients(ingredients, items);

    const orderSum = orderIngredients.reduce(( acc, current: any ) => acc += current.price, 0)
    const profileFeedRoute = location.pathname.includes("profile/orders")

    const openModal = (): void => {
        const route = profileFeedRoute ? "profile/orders" : "feed"
        history.push({
            pathname: `/${ route }/${ order.number }`,
            state: { background: location }
        })
    }

    const statusLabel = ( status: string ) => {
        switch (status) {
            case ( 'created' ): {
                return 'Создан'
            }
            case ( 'pending' ): {
                return 'В работе'
            }
            case ( 'done' ): {
                return 'Выполнен'
            }
            default: {
                break
            }
        }
    }

    return (
        <article className={ `${ styles.card } mr-2` } onClick={ openModal }>
            <div className={ styles.cardHeader }>
                <div className="text text_type_digits-default">#{ number }</div>
                { createdAt &&
                    <time className="text text_type_main-default text_color_inactive"
                          dateTime={ createdAt }>{ convertDate(createdAt) }</time>
                }
            </div>
            <h2 className="text text_type_main-medium mt-6">{ name }</h2>
            { profileFeedRoute && <h3 className={ `${status === "done" ? styles.green : ""} text text_type_main-default mt-2` }>{ statusLabel(status) }</h3> }
            <div className={ styles.itemWrapper }>
                <div className={ styles.ingredientsWrapper }>
                    { orderIngredients.slice(0, 6).map(( item, index ) => (
                        <div className={ styles.imageWrapper } key={ index }
                             style={ { zIndex: orderIngredients.length - index } }>
                            <img src={ item?.image_mobile } alt={ item?.name }
                                 style={ ( orderIngredients.length > 6 ) && ( index === 5 ) ? { opacity: .6 } : {} }/>
                            { ( orderIngredients.length > 6 ) && ( index === 5 ) &&
                                <div className={ `${ styles.ingredientNumber } text text_type_main-default` }>
                                    +{ orderIngredients.length - ( index + 1 ) }
                                </div>
                            }
                        </div>
                    )) }
                </div>
                <div className={ `${ styles.price } ` }>
                    <span className="text text_type_digits-default mr-2">{ orderSum }</span>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </article>
    );
};

export default FeedOrderCard;