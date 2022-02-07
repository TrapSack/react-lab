import Modal from "@/elements/modal";
import { ReactNode, useState } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export default function UserLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(<LoginForm setIsOpen={setIsOpen} />);
  function setLoginModal() {
    setModalContent(<LoginForm setIsOpen={setIsOpen} />);
    setIsOpen(true);
  }
  function setRegisterModal() {
    setModalContent(<RegisterForm setIsOpen={setIsOpen} />);
    setIsOpen(true);
  }
  return (
    <>
      <button type="button" className="navbar__link navbar__link--btn" onClick={setLoginModal}>
        Login
      </button>
      <button type="button" className="navbar__link navbar__link--btn" onClick={setRegisterModal}>
        Register
      </button>
      <Modal setIsOpen={setIsOpen} open={isOpen}>
        {modalContent}
      </Modal>
    </>
  );
}
