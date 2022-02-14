/* eslint-disable react/jsx-no-bind */
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/actions/userActions";
import axios from "axios";
import FormOption from "@/elements/formOption";
import { useNavigate } from "react-router-dom";
import { profile } from "@/helpers/links";
import { ChangeEvent, FormEvent, useState } from "react";
import { ITempUser } from "../interfaces";
import { valiDatePassword } from "../validators";

export default function RegisterForm() {
  const [error, setError] = useState({
    loginInputError: "",
    passwordInputError: "",
    passwordRepeatError: "",
  });
  const dispatch = useDispatch();
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
    confirmPassword: "",
  }));
  const navigate = useNavigate();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hasErrors = Object.values(error).every((err) => err === "");
    if (hasErrors && tempUser.login && tempUser.password && tempUser.confirmPassword) {
      axios.post(`api/postUser/${tempUser.login}/${tempUser.password}`).then((res) => {
        if (res.data) {
          dispatch(logIn(tempUser.login));
          navigate(profile, { replace: true });
        }
      });
    }
    setError((prev) => ({
      ...prev,
      loginInputError: tempUser.login ? "" : "login is required",
      passwordInputError: tempUser.password ? "" : "Password is required",
      passwordRepeatError: tempUser.confirmPassword ? "" : "Confirm password is required",
    }));
  }
  function validation(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "login":
        axios.get(`api/getUser/${tempUser.login}`).then((res) => {
          setError((prev) => ({
            ...prev,
            loginInputError: tempUser.login === res.data && tempUser.login.length !== 0 ? "User Already exists" : "",
          }));
        });
        if (!value)
          setError((prev) => ({
            ...prev,
            loginInputError: "login is required",
          }));
        break;
      case "password":
        setError((prev) => ({
          ...prev,
          passwordInputError:
            valiDatePassword(value) || value.length === 0
              ? ""
              : "Password length should be more than 8 sybmols, atleast one uppercase and lowercase symbol",
        }));
        if (!value)
          setError((prev) => ({
            ...prev,
            passwordInputError: "Password is required",
          }));
        break;
      case "confirmPassword":
        setError((prev) => ({
          ...prev,
          passwordRepeatError: value === tempUser.password ? "" : "Passwords don`t match",
        }));
        if (!value)
          setError((prev) => ({
            ...prev,
            passwordRepeatError: "Confirm password is required",
          }));
        break;
      default:
        break;
    }
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTempUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <form onSubmit={handleSubmit} className="form form--register">
      <FormOption
        type="text"
        placeholder="Login"
        inputName="login"
        value={tempUser.login}
        handleChange={handleChange}
        error={error.loginInputError}
        handleBlur={validation}
      />
      <FormOption
        type="password"
        placeholder="Password"
        inputName="password"
        value={tempUser.password}
        handleChange={handleChange}
        error={error.passwordInputError}
        handleBlur={validation}
      />
      <FormOption
        type="password"
        placeholder="Confirm"
        inputName="confirmPassword"
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value={tempUser.confirmPassword!}
        handleChange={handleChange}
        error={error.passwordRepeatError}
        handleBlur={validation}
      />
      <button type="submit" className="form__submit">
        Register
      </button>
    </form>
  );
}
