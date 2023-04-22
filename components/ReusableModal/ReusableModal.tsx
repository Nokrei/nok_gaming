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
  Modal.setAppElement("#__next");

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      // style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="modalOverlay"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded bg-gray-800 p-5"
    >
      <div>
        <div className="flex justify-between pb-5">
          <h2 className="text-2xl">{modalTitle}</h2>
          <button
            onClick={closeModal}
            className="rounded bg-red-500 p-2 duration-100 hover:bg-red-400"
          >
            Close
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5 ">{children}</div>
      </div>
    </Modal>
  );
}
