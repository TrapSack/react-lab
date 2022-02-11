/* eslint-disable react/jsx-no-bind */
import FormOption from "@/elements/formOption";
import { logIn } from "@/redux/actions/userActions";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITempUser } from "../interfaces";

interface IFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  redirectPath?: string;
}
// move to one component
export default function loginForm(props: IFormProps) {
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
  }));
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios.get(`api/authorizeUser/${tempUser.login}/${tempUser.password}`).then((res) => {
      if (res.data) {
        dispatch(logIn(tempUser.login));
        props.setIsOpen(false);
        props.redirectPath && navigate(props.redirectPath, { replace: true });
      }
      setError(res.data ? "" : "Incorrect login or password");
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTempUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="form form--login">
      <FormOption
        type="text"
        placeholder="Login"
        inputName="login"
        value={tempUser.login}
        handleChange={handleChange}
      />
      <FormOption
        type="password"
        placeholder="Password"
        inputName="password"
        value={tempUser.password}
        handleChange={handleChange}
        error={error}
      />
      <button type="submit" className="form__submit">
        Login
      </button>
    </form>
  );
}
