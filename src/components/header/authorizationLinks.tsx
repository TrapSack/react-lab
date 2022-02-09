import Modal from "@/elements/modal";
import { ReactNode, useState } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

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
  // currentUser: {
  //   login: string;
  // };
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
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState<IModalConent>({
    content: <LoginForm setIsOpen={setIsOpen} setState={props.setState} />,
    title: "Login",
  });
  function setLoginModal() {
    setModal({
      content: <LoginForm setIsOpen={setIsOpen} setState={props.setState} />,
      title: "Login",
    });
    setIsOpen(true);
  }
  function setRegisterModal() {
    setModal({
      content: <RegisterForm setState={props.setState} />,
      title: "Register",
    });
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
      <Modal setIsOpen={setIsOpen} open={isOpen} title={modal.title}>
        {modal.content}
      </Modal>
    </>
  );
}
