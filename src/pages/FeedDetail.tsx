import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useSelector } from "../services/hooks";
import { useParams } from "react-router-dom";
import styles from "./feed-detail.module.css";
import { NotFound404 } from "./index";
import API from "../utils/api";
import { Rings } from "react-loader-spinner";
import { getIngredients } from "../services/selectors/ingredientsSelector";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { convertDate } from "../utils/date";

const FeedDetail: FC = (): ReactElement => {
    const { items } = useSelector(store => store.ingredients);
    const { id } = useParams<{ id?: string }>();

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getOrder = () => {
        setLoading(true);
         API.getOrder(`/orders/${ id }`).then(res => {
            const { success, orders } = res;
            if (success && orders) {
                setOrder(orders[0])
            }
            setLoading(false);
        })
    }

    useEffect(() => {
        getOrder();
    }, [])

    if (loading) {
        return <Rings height={ 300 } width={ 300 } wrapperClass={ styles.loaderWrapper } color="#8585AD"/>
    }

    if (order && items.length > 0) {
        const { number, createdAt, name, ingredients, status } = order;
        const orderIngredients = getIngredients(ingredients, items);
        const orderSum = orderIngredients.reduce(( acc, current ) => acc += current.price, 0)
        const uniqueIngredients = orderIngredients.filter((v, i, a) => a.indexOf(v) === i);

        const orderUniqueIngredients = uniqueIngredients.map(e => {
            const ingredient = orderIngredients.find(el => el?._id === e?._id);
            const count = orderIngredients.filter(orderIngredient => orderIngredient?._id === ingredient?._id).length;

            if (ingredient && count) {
                return {
                    ...ingredient,
                    count
                }
            }

            return undefined;
        })



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
            <div className={ styles.wrapper }>
                <div className={ styles.wrapperInner }>
                    <div className={ `${ styles.number } text text_type_digits-default` }>#{ number }</div>
                    <div className="text text_type_main-medium mt-10">{ name }</div>
                    <div
                        className={ `${ styles.colorGreen } text text_type_main-default mt-3` }>{ statusLabel(status) }</div>
                    <div className="text text_type_main-medium mt-15">Состав:</div>
                    <div className={ styles.ingredientsWrapper }>
                        { orderUniqueIngredients.map(( item, index ) => (
                            <article  key={ index } className={ styles.ingredientWrapper }>
                                <div className={`${ styles.imageWrapper } mr-4` }>
                                    <img src={ item?.image_mobile } alt={ item?.name }/>
                                </div>
                                <div className={`text text_type_main-default mr-4 ${styles.title}`}>{ item?.name }</div>
                                <div className={ `${ styles.price } ` }>
                                    <span className="text text_type_digits-default mr-2">{ item?.count } x</span>
                                    <span className="text text_type_digits-default mr-2">{ item?.price }</span>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </article>
                        )) }
                    </div>
                    <div className={styles.orderInfo}>
                        { createdAt &&
                            <time className="text text_type_main-default text_color_inactive"
                                  dateTime={ createdAt }>{ convertDate(createdAt) }</time>
                        }
                        <div className={ `${ styles.price } ` }>
                            <span className="text text_type_digits-default mr-2">{ orderSum }</span>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return <NotFound404/>

};

export default FeedDetail;