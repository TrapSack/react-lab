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
    confirmPasswordInputError: "",
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
    console.log(hasErrors);
    if (hasErrors && tempUser.login && tempUser.password && tempUser.confirmPassword) {
      axios.post(`api/postUser/${tempUser.login}/${tempUser.password}`).then((res) => {
        if (res.data) {
          dispatch(logIn(tempUser.login));
          navigate(profile, { replace: true });
        }
      });
    } else {
      setError((prev) => ({
        loginInputError: tempUser.login ? prev.loginInputError : "login is required",
        passwordInputError: tempUser.password ? prev.passwordInputError : "Password is required",
        confirmPasswordInputError: tempUser.confirmPassword
          ? prev.confirmPasswordInputError
          : "Confirm password is required",
      }));
    }
  }

  function checkOnEmptyInput(name: string, value: string) {
    if (!value)
      setError((prev) => ({
        ...prev,
        [`${name}InputError`]: `${name[0].toUpperCase() + name.slice(1)} is required`,
      }));
  }

  function loginValidation(login: string) {
    if (login) {
      axios.get(`api/getUser/${login}`).then((res) => {
        setError((prev) => ({
          ...prev,
          loginInputError: res.data ? "User Already exists" : "",
        }));
      });
    }
  }

  function passwordValidation(password: string) {
    setError((prev) => ({
      ...prev,
      passwordInputError: valiDatePassword(password)
        ? ""
        : "Password length should be more than 8 sybmols, atleast one uppercase and lowercase symbol",
    }));
  }

  function confirmPasswordValidation(password: string) {
    setError((prev) => ({
      ...prev,
      confirmPasswordInputError: password === tempUser.password ? "" : "Passwords don`t match",
    }));
  }

  function validation(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "login":
        loginValidation(value);
        checkOnEmptyInput(name, value);
        break;
      case "password":
        passwordValidation(value);
        checkOnEmptyInput(name, value);
        break;
      case "confirmPassword":
        confirmPasswordValidation(value);
        checkOnEmptyInput(name, value);
        break;
      default:
        break;
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    // validation(event);
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
        error={error.confirmPasswordInputError}
        handleBlur={validation}
      />
      <button type="submit" className="form__submit">
        Register
      </button>
    </form>
  );
}
