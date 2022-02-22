import axios from "axios";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IFormOptionProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line react/require-default-props
  error?: string;
  setError: Dispatch<
    SetStateAction<{ loginInputError: string; passwordInputError?: string; confirmPasswordInputError?: string }>
  >;
}

export default function LoginFormOption(props: IFormOptionProps) {
  function checkOnEmptyInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (!value)
      props.setError((prev) => ({
        ...prev,
        [`${name}InputError`]: `${name[0].toUpperCase() + name.slice(1)} is required`,
      }));
  }

  function loginValidation(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) {
      axios.get(`api/getUser/${event.target.value}`).then((res) => {
        props.setError((prev) => ({
          ...prev,
          loginInputError: res.data ? "User Already exists" : "",
        }));
      });
    }
  }
  return (
    <>
      <label htmlFor="login" className="form__option">
        Login
        <input
          type="text"
          placeholder="Login"
          name="login"
          className="form__input"
          value={props.value}
          onChange={(e) => {
            checkOnEmptyInput(e);
            props.handleChange(e);
          }}
          onBlur={(e) => {
            loginValidation(e);
            checkOnEmptyInput(e);
          }}
        />
      </label>
      {props.error && <span className="form__input-error">{props.error}</span>}
    </>
  );
}
