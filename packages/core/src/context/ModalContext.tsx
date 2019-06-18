import React, { useContext } from 'react';
import { useModalState as useModalHook } from 'src/components/Modal/Modal';
import { ModalIDs } from 'src/state/apollo-link-state/modal/modalState';

interface IModalContext {
  isVisible: (modalID: ModalIDs) => boolean;
  toggleModal: (modalID: ModalIDs, data?: any) => void;
  openModal: (modalID: ModalIDs, data?: any) => void;
  closeModal: (modalID: ModalIDs, data?: any) => void;
  data: any;
}

export const ModalContext = React.createContext<IModalContext>({
  isVisible: () => false,
  toggleModal: () => {},
  openModal: () => {},
  closeModal: () => {},
  data: {},
});

/**
 * isVisible(id: ModalIDs)
 */
export const ModalProvider = ({ children }) => {
  const { isVisible, toggleModal, openModal, closeModal, data } = useModalHook(
    Object.values(ModalIDs),
  );
  return (
    <ModalContext.Provider
      value={{ isVisible, openModal, closeModal, toggleModal, data }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (modalID: ModalIDs) => {
  const context = useContext(ModalContext);

  return {
    isVisible: context.isVisible(modalID),
    toggleModal: ({ data }: { data?: any } = { data: {} }) => e => {
      context.toggleModal(modalID, data);
    },
    openModal: ({ data }: { data?: any } = { data: {} }) => e => {
      context.openModal(modalID, data);
    },
    closeModal: ({ data }: { data?: any } = { data: {} }) => e => {
      context.closeModal(modalID, data);
    },
    data: context.data(modalID),
  };
};
