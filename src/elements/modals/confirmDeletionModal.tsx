import { Dispatch, SetStateAction } from "react";
import Modal from "./modal";
import elementStyles from "../elementStyles.module.scss";

interface IConfirmDeletionModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setConfirm: Dispatch<SetStateAction<boolean>>;
  game: string;
}
console.log(elementStyles);
export default function ConfirmDeletionModal(props: IConfirmDeletionModalProps) {
  return (
    <Modal open={props.showModal} setIsOpen={props.setShowModal} title={`Are you sure want to delete ${props.game}`}>
      <div className={elementStyles["confirm-deletion-form"]}>
        <button
          onClick={() => {
            props.setShowModal(false);
            props.setConfirm(true);
          }}
          type="button"
          className={`${elementStyles["confirm-deletion-form__button"]} ${["confirm-deletion-form__button--yes"]}`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => {
            props.setShowModal(false);
            props.setConfirm(false);
          }}
          className={`${elementStyles["confirm-deletion-form__button"]} ${["confirm-deletion-form__button--no"]}`}
        >
          No
        </button>
      </div>
    </Modal>
  );
}
