import Modal from "@/elements/modals/modal";
import { ReactNode, useState } from "react";
import LoginForm from "../forms/loginForm";
import RegisterForm from "../forms/registerForm";
import header from "../header.module.scss";

interface IModalConent {
  content: ReactNode;
  title: string;
}

export default function AuthorizationLinks() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<IModalConent>({
    content: <LoginForm setIsOpen={setIsModalOpen} />,
    title: "Login",
  });
  function setLoginModal() {
    setModal({
      content: <LoginForm setIsOpen={setIsModalOpen} />,
      title: "Login",
    });
    setIsModalOpen(true);
  }
  function setRegisterModal() {
    setModal({
      content: <RegisterForm />,
      title: "Register",
    });
    setIsModalOpen(true);
  }
  return (
    <>
      <button type="button" className={`${header.navbar__link} ${header["navbar__link--btn"]}`} onClick={setLoginModal}>
        Login
      </button>
      <button
        type="button"
        className={`${header.navbar__link} ${header["navbar__link--btn"]}`}
        onClick={setRegisterModal}
      >
        Register
      </button>
      <Modal setIsOpen={setIsModalOpen} open={isModalOpen} title={modal.title}>
        {modal.content}
      </Modal>
    </>
  );
}
