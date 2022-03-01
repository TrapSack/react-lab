/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import { Dispatch, ReactNode, SetStateAction } from "react";
import ReactDOM from "react-dom";

interface IModalProps {
  open: boolean;
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
}

const portalDiv = document.getElementById("portal")!;

export default function Modal(props: IModalProps) {
  return ReactDOM.createPortal(
    props.open && (
      <>
        <div
          className="modal-overlay"
          role="button"
          tabIndex={0}
          aria-label="overlay"
          onClick={() => {
            props.setIsOpen(false);
          }}
        />
        <div className="modal">
          <div className="modal__title-wrapper">
            <span className="modal__title">{props.title}</span>
            <button
              className="modal__close-btn"
              type="button"
              onClick={() => {
                props.setIsOpen(false);
              }}
            >
              &times;
            </button>
          </div>
          {props.children}
        </div>
      </>
    ),
    portalDiv
  );
}
