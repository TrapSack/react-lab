import { ChangeEvent } from "react";

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
      <label htmlFor="login" className="form__option">
        {props.placeholder}
        <input
          type={props.type}
          placeholder={props.placeholder}
          name={props.inputName}
          className="form__input"
          value={props.value}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
        />
      </label>
      {props.hint && <span className="form__hint">{props.hint}</span>}
      {props.error && <span className="form__input-error">{props.error}</span>}
    </>
  );
}
