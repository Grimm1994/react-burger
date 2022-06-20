import React, { FC, ReactElement } from 'react';
import styles from './modal-overlay.module.css';
import { TModalOverlay } from "../../utils/types";

const ModalOverlay: FC<TModalOverlay> = ( { onClose } ): ReactElement => {

    return (
        <div className={ styles.overlay } onClick={ onClose }>
        </div>
    );

};

export default ModalOverlay;