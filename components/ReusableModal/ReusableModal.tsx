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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded bg-gray-800 p-1 md:p-5"
    >
      <div>
        <div className="justify-between pb-5">
          <button
            onClick={closeModal}
            className="absolute right-2 top-2 rounded-full bg-red-500 px-1 text-sm duration-100 hover:bg-red-400"
          >
            Close
          </button>
          <h2 className="pt-7 text-center md:pt-3 md:text-2xl">{modalTitle}</h2>
        </div>

        <div className="flex flex-wrap gap-2 md:grid   md:grid-cols-4 md:gap-5">
          {children}
        </div>
      </div>
    </Modal>
  );
}
