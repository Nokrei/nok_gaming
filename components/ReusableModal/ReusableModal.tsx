import { useState } from "react";
import Modal from "react-modal";

type Props = {
  modalTitle: string;
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export default function ReusableModal({
  modalTitle,
  isModalOpen,
  closeModal,
  children,
}: Props) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "80vmin",
    },
  };

  Modal.setAppElement("#__next");

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-black">{modalTitle}</h2>
        <button onClick={closeModal} className="text-black">
          close
        </button>
        <div className="text-black">{children}</div>
      </Modal>
    </div>
  );
}
