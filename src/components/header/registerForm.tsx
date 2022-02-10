/* eslint-disable react/jsx-no-bind */
import axios from "axios";
import FormOption from "@/elements/formOption";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ITempUser } from "./interfaces";
import { valiDatePassword } from "./validators";
import debounce from "../../helpers/useDebounce";

interface IError {
  isError: boolean;
}

interface IState {
  error: IError;
  currentUser: {
    login: string;
  };
}

interface IFormProps {
  setState: (
    state:
      | IState
      | ((prevState: Readonly<IState>, props: Readonly<unknown>) => IState | Pick<IState, keyof IState> | null)
      | Pick<IState, keyof IState>
      | null,
    callback?: (() => void) | undefined
  ) => void;
}

export default function RegisterForm(props: IFormProps) {
  const [error, setError] = useState({
    loginInputError: "",
    PasswordInputError: "",
    PasswordRepeatError: "",
  });
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
    confirmPassword: "",
  }));
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // rename iscoorect haserrors
    const hasErrors = Object.values(error).every((err) => err === "");
    if (hasErrors && tempUser.login.length > 0) {
      axios.post(`api/postUser/${tempUser.login}/${tempUser.password}`).then((res) => {
        if (res.data) {
          props.setState({
            error: { isError: false },
            currentUser: { login: tempUser.login },
          });
        }
      });
    }
  }
  function validateUserLogin() {
    axios.get(`api/getUser/${tempUser.login}`).then((res) => {
      setError((prev) => ({
        ...prev,
        loginInputError: tempUser.login === res.data && tempUser.login.length !== 0 ? "User Already exists" : "",
      }));
    });
  }
  const debouncedValidate = debounce(validateUserLogin, 300);
  useEffect(() => {
    debouncedValidate();
  }, [tempUser.login]);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "password":
        setError((prev) => ({
          ...prev,
          PasswordInputError:
            valiDatePassword(value) || value.length === 0 ? "" : "Password length should be more than 6 sybmols",
        }));
        break;
      case "confirmPassword":
        setError((prev) => ({
          ...prev,
          PasswordRepeatError: value === tempUser.password ? "" : "Passwords don`t match",
        }));
        break;
      default:
        break;
    }
    setTempUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <form onSubmit={handleSubmit} className="modal__form">
      <FormOption
        type="text"
        placeholder="Login"
        inputName="login"
        value={tempUser.login}
        handleChange={handleChange}
        error={error.loginInputError}
      />
      <FormOption
        type="password"
        placeholder="Password"
        inputName="password"
        value={tempUser.password}
        handleChange={handleChange}
        error={error.PasswordInputError}
      />
      <FormOption
        type="password"
        placeholder="Confirm"
        inputName="confirmPassword"
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value={tempUser.confirmPassword!}
        handleChange={handleChange}
        error={error.PasswordRepeatError}
      />
      <button type="submit" className="modal__submit">
        Register
      </button>
    </form>
  );
}
