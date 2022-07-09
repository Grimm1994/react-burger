import React, { FC, ReactElement, useRef } from 'react';
import styles from "./constructor-item.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteConstructorItem } from "../../../../services/actions/cart";
import { useDispatch } from "../../../../services/hooks";
import { TConstructorItem } from "../../../../utils/types";
import { useDrag, useDrop } from "react-dnd";


const ConstructorItem: FC<TConstructorItem> = ({ item, index, sortIngredient }): ReactElement => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const [{ handlerId }, drop] = useDrop({
        accept: "constructorItem",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            sortIngredient(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "constructorItem",
        item: () => {
            return { item, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div className={ styles.item } ref={ref} style={{ opacity }} data-handler-id={handlerId}>
            <div className={ styles.dragIcon }>
                <DragIcon type="primary"/>
            </div>
            <ConstructorElement
                text={ item.name }
                price={ item.price }
                thumbnail={ item.image }
                handleClose={ () => dispatch(deleteConstructorItem(item)) }
            />
        </div>
    );
};

export default ConstructorItem;