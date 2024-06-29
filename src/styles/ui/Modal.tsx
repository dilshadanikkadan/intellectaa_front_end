import React from "react";

interface ModalProps {
  id: string;
  title: string;
  content: React.ReactNode;
  buttonText: string;
}

const Modal: React.FC<ModalProps> = ({ id, title, content, buttonText }) => {
  const openModal = () => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    modal?.showModal();
  };

  return (
    <>
      <button className="btn relative z-50" onClick={openModal}>
        {buttonText}
      </button>
      <dialog id={id} className="modal ">
        <div className="modal-box  flex    flex-col">
          <div className="py-4  text-center">{content}</div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button className="btn">Cancel</button>
              <button className="btn">Block</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
