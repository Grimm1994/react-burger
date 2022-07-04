import React, { FC, Fragment, ReactElement, useCallback } from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "../../services/hooks";
import { addConstructorItem, setBun, sortIngredients } from "../../services/actions/cart";
import { DropTargetMonitor, useDrop } from "react-dnd";
import ConstructorItem from "./components/constructor-item/ConstructorItem";
import ConstructorTotal from "./components/constructor-total/ConstructorTotal";
import { TUniqueIngredient } from "../../utils/types";


const BurgerConstructor: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { items, bun } = useSelector((store) => store.cart);


    const moveItem = (item: TUniqueIngredient) => {
        if (item.type !== "bun") {
            if (!bun.name) {
                alert('Сначала выберите булку');
            } else {
                dispatch(addConstructorItem({
                    ...item,
                    uuid: uuidv4()
                }));
            }
        } else {
            dispatch(setBun(item))
        }
    }

    const [{ opacity }, dropTarget] = useDrop({
        accept: "items",
        collect: (monitor: DropTargetMonitor) => ({
            opacity: monitor.isOver() ? "0.5" : "1"
        }),
        drop(itemId: TUniqueIngredient) {
            moveItem(itemId)
        }
    })

    const sortIngredient = useCallback((dragIndex: number, hoverIndex: number): void => {
        const sortedIngredients = items.slice();
        sortedIngredients.splice(dragIndex, 1);
        sortedIngredients.splice(hoverIndex, 0, items[dragIndex]);

        dispatch(sortIngredients(sortedIngredients))
    }, [items, dispatch])

    const renderConstructor = () => {
        if (items.length < 1 && !bun.name) {
            return (
                <div className={ styles.emptyWrapper }>
                    <h3 className="text text_type_main-large text_color_inactive">Перетащите ингредиенты</h3>
                    <p className="text text_type_main-default text_color_inactive mt-5">(Начните с выбора булки)</p>
                </div>
            )
        }

        return (
            <div className={ `${ styles.wrapper } pl-4 pr-4` }>
                { bun.name &&
                    <ConstructorElement
                        type="top"
                        isLocked={ true }
                        text={ `${ bun.name } (верх)` }
                        price={ bun.price }
                        thumbnail={ bun.image }
                    />
                }

                <div className={ styles.wrapperInner }>
                    { items.map((item: TUniqueIngredient, index: number) =>
                        <Fragment key={ item.uuid }>
                            <ConstructorItem
                                index={ index }
                                item={ item }
                                sortIngredient={ sortIngredient }
                            />
                        </Fragment>
                    ) }
                </div>
                { bun.name &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={ true }
                        text={ `${ bun.name } (низ)` }
                        price={ bun.price }
                        thumbnail={ bun.image }
                    />
                }

                <ConstructorTotal bun={ bun } items={ items }/>
            </div>
        )
    }

    return (
        <div className={ styles.constructorWrapper } ref={ dropTarget } style={ { opacity } }>
            { renderConstructor() }
        </div>
    );
};


export default BurgerConstructor;