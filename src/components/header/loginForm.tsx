import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { ITempUser } from "./interfaces";

interface IFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: { login: string };
}

export default function loginForm(props: IFormProps) {
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
  }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios.get(`api/authorizeUser/${tempUser.login}/${tempUser.password}`).then((res)=> {
      if(res.data) {
        
      }
    })
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

      <button type="submit" className="modal__submit">
        Login
      </button>
    </form>
  );
}
