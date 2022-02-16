/* eslint-disable react/jsx-no-bind */
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/actions/userActions";
import axios from "axios";
import ConfirmPasswordFormOption from "@/elements/confirmPasswordFormOption";
import LoginFormOption from "@/elements/loginFormOption";
import PasswordFormOption from "@/elements/passwordFormOption";
import { useNavigate } from "react-router-dom";
import { profile } from "@/helpers/links";
import { ChangeEvent, FormEvent, useState } from "react";
import { IError, ITempUser } from "../interfaces";

export default function RegisterForm() {
  const [error, setError] = useState<IError>({
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
      axios.post(`api/postUser/`, { userName: tempUser.login, userPass: tempUser.password }).then((res) => {
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
      <LoginFormOption
        type="text"
        placeholder="Login"
        inputName="login"
        value={tempUser.login}
        handleChange={handleChange}
        error={error.loginInputError}
        setError={setError}
      />
      <PasswordFormOption
        type="password"
        placeholder="Password"
        inputName="password"
        value={tempUser.password}
        handleChange={handleChange}
        error={error.passwordInputError}
        setError={setError}
      />
      <ConfirmPasswordFormOption
        type="password"
        placeholder="Confirm"
        inputName="confirmPassword"
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value={tempUser.confirmPassword!}
        handleChange={handleChange}
        error={error.confirmPasswordInputError}
        setError={setError}
        passwordToConfirm={tempUser.password}
      />

      <button type="submit" className="form__submit">
        Register
      </button>
    </form>
  );
}
