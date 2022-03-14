import { ChangeEvent } from "react";
import elementStyles from "../elementStyles.module.scss";

interface IFormOptionProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
  type: string;
  placeholder: string;
  error?: string;
  hint?: string;
}

export default function FormOption(props: IFormOptionProps) {
  return (
    <>
      <label htmlFor={props.inputName} className={elementStyles.form__option}>
        {props.placeholder}
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.inputName}
          className={elementStyles.form__input}
          value={props.value}
          style={{ color: "white" }}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
      </label>
      {props.hint && <span className={elementStyles.form__hint}>{props.hint}</span>}
      {props.error && <span className={elementStyles["form__input-error"]}>{props.error}</span>}
    </>
  );
}

FormOption.defaultProps = {
  error: "",
  hint: "",
  handleBlur: (): null => null,
};
