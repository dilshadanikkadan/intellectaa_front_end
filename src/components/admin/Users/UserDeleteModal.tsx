import { userBlockHelper } from "@/helpers/user/userApiHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

interface ModalProps {
  id: string;
  title: string;
  content: React.ReactNode;
  buttonText: string;
  email: string;
}

const UserBlockModal: React.FC<ModalProps> = ({
  id,
  title,
  content,
  email,
  buttonText,
}) => {
  const queryClient = useQueryClient();
  const { mutate: blockMutate, isPending } = useMutation({
    mutationFn: userBlockHelper,
    onSuccess: (data) => {
      if (data?.success) {
        queryClient.invalidateQueries(["users"] as any);
        closeModal();
      }
    },
  });

  const openModal = () => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    modal?.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById(id) as HTMLDialogElement | null;
    modal?.close();
  };

  const handleBlock = () => {
    blockMutate({ email });
  };

  return (
    <>
      <button className="btn relative w-20 z-50" onClick={openModal}>
        {buttonText}
      </button>
      <dialog id={id} className="modal bg-white">
        <div className="modal-box flex flex-col">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="py-4 text-center">{content}</div>
          <div className="modal-action">
            <form method="dialog" className="flex gap-4">
              <button className="btn" onClick={closeModal}>Cancel</button>
              <button className="btn" onClick={handleBlock} disabled={isPending}>
                {isPending ? "Blocking..." : "Block"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UserBlockModal;