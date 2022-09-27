import React, { useState, createContext, useContext } from 'react';
import FMPaymentModal from '../../components/modals/FMPaymentModal';
import AppartmentModal from '../../components/modals/AppartmentModal';
import ExpenseModal from '../../components/modals/ExpenseModal';
import UserModal from '../../components/modals/UserModal';

export const MODAL_TYPES = {
    FMPAYMENT_MODAL: 'FMPAYMENT_MODAL',
    APPARTMENT_MODAL: 'APPARTMENT_MODAL',
    EXPENSE_MODAL: 'EXPENSE_MODAL',
    USER_MODAL: 'USER_MODAL',
};

const MODAL_COMPONENTS = {
    [MODAL_TYPES.FMPAYMENT_MODAL]: FMPaymentModal,
    [MODAL_TYPES.APPARTMENT_MODAL]: AppartmentModal,
    [MODAL_TYPES.EXPENSE_MODAL]: ExpenseModal,
    [MODAL_TYPES.USER_MODAL]: UserModal,
};

// type GlobalModalContext = {
//     showModal: (modalType: string, modalProps?: any) => void;
//     hideModal: () => void;
//     store: any;
// };

const initalState = {
    showModal: () => { },
    hideModal: () => { },
    store: {},
};

const GlobalModalContext = createContext(initalState);
export const useGlobalModalContext = () => useContext(GlobalModalContext);

export const GlobalModal = ({ children }) => {
    const [store, setStore] = useState();
    const { modalType, modalProps } = store || {};

    const showModal = (modalType, modalProps) => {
        setStore({
            ...store,
            modalType,
            modalProps,
        });
    };

    const hideModal = () => {
        setStore({
            ...store,
            modalType: null,
            modalProps: {},
        });
    };

    const renderComponent = () => {
        const ModalComponent = MODAL_COMPONENTS[modalType];
        if (!modalType || !ModalComponent) {
            return null;
        }
        return <ModalComponent id="global-modal" {...modalProps} />;
    };

    return (
        <GlobalModalContext.Provider value={{ store, showModal, hideModal }}>
            {renderComponent()}
            {children}
        </GlobalModalContext.Provider>
    );
};