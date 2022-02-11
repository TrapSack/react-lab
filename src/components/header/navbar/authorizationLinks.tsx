import Modal from "@/elements/modal";
import { ReactNode, useState } from "react";
import LoginForm from "../forms/loginForm";
import RegisterForm from "../forms/registerForm";

interface IError {
  isError: boolean;
}
interface IState {
  error: IError;
  currentUser: {
    login: string;
  };
}
interface IProps {
  setState: (
    state:
      | IState
      | ((prevState: Readonly<IState>, props: Readonly<unknown>) => IState | Pick<IState, keyof IState> | null)
      | Pick<IState, keyof IState>
      | null,
    callback?: (() => void) | undefined
  ) => void;
}

interface IModalConent {
  content: ReactNode;
  title: string;
}

export default function AuthorizationLinks(props: IProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<IModalConent>({
    content: <LoginForm setIsOpen={setIsModalOpen} setState={props.setState} />,
    title: "Login",
  });
  function setLoginModal() {
    setModal({
      content: <LoginForm setIsOpen={setIsModalOpen} setState={props.setState} />,
      title: "Login",
    });
    setIsModalOpen(true);
  }
  function setRegisterModal() {
    setModal({
      content: <RegisterForm setState={props.setState} />,
      title: "Register",
    });
    setIsModalOpen(true);
  }
  return (
    <>
      <button type="button" className="navbar__link navbar__link--btn" onClick={setLoginModal}>
        Login
      </button>
      <button type="button" className="navbar__link navbar__link--btn" onClick={setRegisterModal}>
        Register
      </button>
      <Modal setIsOpen={setIsModalOpen} open={isModalOpen} title={modal.title}>
        {modal.content}
      </Modal>
    </>
  );
}
