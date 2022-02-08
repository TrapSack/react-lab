import { ChangeEvent, FormEvent, useState } from "react";
import { ITempUser } from "./interfaces";
import { valiDatePassword, validateUserLogin } from "./validators";

interface IFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function loginForm(props: IFormProps) {
  const [error, setError] = useState({
    loginInputError: "",
    PasswordInputError: "",
  });
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
  }));
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(tempUser);
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    // if (name === "login") {
    //   validateUserLogin(value).then((res) => {
    //     if (value === res) {
    //       error.loginInputError = "User already exists";
    //     } else {
    //       error.loginInputError = "";
    //     }
    //   });
    // }
    if (name === "password") {
      
    }
    setTempUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="modal__title-wrapper">
        <span className="modal__title">Login</span>
        <button
          className="modal__close-btn"
          type="button"
          onClick={() => {
            console.log("close modal from other window");
            setTempUser({
              login: "",
              password: "",
              confirmPassword: "",
            });
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
          value={tempUser.login}
          onChange={handleChange}
        />
      </label>
      <span className="input-error">{error.loginInputError}</span>
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
      <span className="input-error">{error.PasswordInputError}</span>
      <button type="submit" className="modal__submit">
        Login
      </button>
    </form>
  );
}
