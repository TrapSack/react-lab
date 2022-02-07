import { ChangeEvent, FormEvent, useState } from "react";
import { ITempUser } from "./interfaces";

interface IFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterForm(props: IFormProps) {
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
    confirmPassword: "",
  }));
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(tempUser);
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTempUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal__title-wrapper">
        <span className="modal__title">Register</span>
        <button
          className="modal__close-btn"
          type="button"
          onClick={() => {
            props.setIsOpen(false);
          }}
        >
          &times;
        </button>
      </div>
      <label htmlFor="login" className="modal__form-option">
        Login
        <input
          type="text"
          placeholder="Login"
          name="login"
          className="modal__input"
          onChange={handleChange}
          value={tempUser.login}
        />
      </label>
      <label htmlFor="password" className="modal__form-option">
        Password
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="modal__input"
          onChange={handleChange}
          value={tempUser.password}
        />
      </label>
      <label htmlFor="password" className="modal__form-option">
        Confirm
        <input
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          className="modal__input"
          onChange={handleChange}
          value={tempUser.confirmPassword}
        />
      </label>
      <button type="submit" className="modal__submit">
        Register
      </button>
    </form>
  );
}
