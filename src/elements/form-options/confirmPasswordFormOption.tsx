import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IFormOptionProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line react/require-default-props
  error?: string;
  passwordToConfirm: string;
  setError: Dispatch<
    SetStateAction<{
      loginInputError: string;
      passwordInputError: string;
      confirmPasswordInputError: string;
      adressInputError: string;
      phoneInputError: string;
    }>
  >;
}

export default function ConfirmPasswordFormOption(props: IFormOptionProps) {
  function confirmPasswordValidation(event: ChangeEvent<HTMLInputElement>) {
    props.setError((prev) => ({
      ...prev,
      confirmPasswordInputError: event.target.value === props.passwordToConfirm ? "" : "Passwords don`t match",
    }));
  }
  function checkOnEmptyInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (!value)
      props.setError((prev) => ({
        ...prev,
        [`${name}InputError`]: `${name[0].toUpperCase() + name.slice(1)} is required`,
      }));
  }
  return (
    <>
      <label htmlFor="login" className="form__option">
        Confirm
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          className="form__input"
          value={props.value}
          onChange={(e) => {
            confirmPasswordValidation(e);
            props.handleChange(e);
          }}
          onBlur={(e) => {
            checkOnEmptyInput(e);
          }}
        />
      </label>
      {props.error && <span className="form__input-error">{props.error}</span>}
    </>
  );
}
