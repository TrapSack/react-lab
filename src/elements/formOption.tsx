import { ChangeEvent } from "react";

interface IFormOptionProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line react/require-default-props
  handleBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
  type: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  error?: string;
  // eslint-disable-next-line react/require-default-props
  handleBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
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
      {props.error && <span className="form__input-error">{props.error}</span>}
    </>
  );
}
