import { validatePhone } from "@/helpers/validators";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import elementStyles from "../elementStyles.module.scss";

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

export default function PhoneFormOption(props: IFormOptionProps) {
  function checkOnEmptyInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (!value)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.setError((prev: any) => ({
        ...prev,
        [`${name}InputError`]: `${name[0].toUpperCase() + name.slice(1)} is required`,
      }));
  }

  function phoneValidation(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (event.target.value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.setError((prev: any) => ({
        ...prev,
        phoneInputError: validatePhone(value) || !value ? "" : "Wrong phone",
      }));
    }
  }
  return (
    <>
      <label htmlFor="login" className={elementStyles.form__option}>
        Phone
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          className={elementStyles.form__input}
          value={props.value}
          onChange={(e) => {
            checkOnEmptyInput(e);
            props.handleChange(e);
          }}
          onBlur={(e) => {
            phoneValidation(e);
            checkOnEmptyInput(e);
          }}
        />
      </label>
      <span className={elementStyles.form__hint}>Ex. +375441234567</span>
      {props.error && <span className={elementStyles["form__input-error"]}>{props.error}</span>}
    </>
  );
}

PhoneFormOption.defaultProps = {
  error: "",
};
