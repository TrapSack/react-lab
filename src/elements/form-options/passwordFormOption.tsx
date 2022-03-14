import { ChangeEvent, Dispatch, SetStateAction } from "react";
import elementStyles from "../elementStyles.module.scss";
import { valiDatePassword } from "../../components/header/validators";

interface IFormOptionProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
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

export default function PasswordFormOption(props: IFormOptionProps) {
  function passwordValidation(event: ChangeEvent<HTMLInputElement>) {
    props.setError((prev) => ({
      ...prev,
      passwordInputError: valiDatePassword(event.target.value)
        ? ""
        : "Password length should be more than 8 sybmols, atleast one uppercase and lowercase symbol",
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
      <label htmlFor="login" className={elementStyles.form__option}>
        Password
        <input
          type="password"
          placeholder="Password"
          name="password"
          className={elementStyles.form__input}
          value={props.value}
          style={{ color: "white" }}
          onChange={(e) => {
            passwordValidation(e);
            checkOnEmptyInput(e);
            props.handleChange(e);
          }}
          onBlur={(e) => {
            checkOnEmptyInput(e);
          }}
        />
      </label>
      {props.error && <span className={elementStyles["form__input-error"]}>{props.error}</span>}
    </>
  );
}

PasswordFormOption.defaultProps = {
  error: "",
};
