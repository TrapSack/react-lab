import { ChangeEvent } from "react";

interface IFormOptionProps {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputName: string;
  type: string;
  placeholder: string;
  // eslint-disable-next-line react/require-default-props
  error?: string;
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
        />
      </label>
      {props.error ? <span className="form__input-error">{props.error}</span> : null}
    </>
  );
}
