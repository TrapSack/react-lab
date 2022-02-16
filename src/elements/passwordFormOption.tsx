import { IError } from "@/components/header/interfaces";
import { valiDatePassword } from "@/components/header/validators";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IFormOptionProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
  type: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  error?: string;
  setError: Dispatch<SetStateAction<IError>>;
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
      <label htmlFor="login" className="form__option">
        {props.placeholder}
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.inputName}
          className="form__input"
          value={props.value}
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
      {props.error && <span className="form__input-error">{props.error}</span>}
    </>
  );
}
