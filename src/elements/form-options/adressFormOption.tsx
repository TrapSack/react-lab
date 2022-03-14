import { ChangeEvent, Dispatch, SetStateAction } from "react";
import elementStyles from "../elementStyles.module.scss";
import { validateAdress } from "../../helpers/validators";

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

export default function AdressFormOption(props: IFormOptionProps) {
  function checkOnEmptyInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (!value)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.setError((prev: any) => ({
        ...prev,
        [`${name}InputError`]: `${name[0].toUpperCase() + name.slice(1)} is required`,
      }));
  }

  function adressValidation(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (event.target.value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props.setError((prev: any) => ({
        ...prev,
        adressInputError: validateAdress(value) || !value ? "" : "Wrong adress",
      }));
    }
  }
  return (
    <>
      <label htmlFor="login" className={elementStyles.form__option}>
        Adress
        <input
          type="text"
          placeholder="Adress"
          name="adress"
          style={{ color: "white" }}
          className={elementStyles.form__input}
          value={props.value}
          onChange={(e) => {
            checkOnEmptyInput(e);
            props.handleChange(e);
          }}
          onBlur={(e) => {
            adressValidation(e);
            checkOnEmptyInput(e);
          }}
        />
      </label>
      <span className={elementStyles.form__hint}>Ex. 24 bg Hello Str</span>
      {props.error && <span className={elementStyles["form__input-error"]}>{props.error}</span>}
    </>
  );
}
AdressFormOption.defaultProps = {
  error: "",
};
