import React, { FC, ReactElement, useEffect } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { createPortal } from "react-dom";
import { TModal } from "../../utils/types";


const Modal: FC<TModal> = ( { onClose, children } ): ReactElement => {

    useEffect(() => {
        const closeOnEsc = ( e: KeyboardEvent ): void => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', closeOnEsc);
        return () => {
            window.removeEventListener('keydown', closeOnEsc);
        }
    }, [onClose]);

    const modal: Element | null = document.getElementById("modal-root") ?? new Element();

    return createPortal(
        (
            <>
                <ModalOverlay onClose={ onClose }/>
                <div className={ `${ styles.modal } pt-10 pl-10 pb-15 pr-10` }>
                    <div className={ styles.close } onClick={ onClose }>
                        <CloseIcon type="primary"/>
                    </div>
                    { children }
                </div>
            </>
        ),
        modal
    );

};


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;