/* eslint-disable react/jsx-no-bind */
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/actions/userActions";

import ConfirmPasswordFormOption from "@/elements/confirmPasswordFormOption";
import LoginFormOption from "@/elements/loginFormOption";
import PasswordFormOption from "@/elements/passwordFormOption";

import { ChangeEvent, FormEvent, useState } from "react";
import { ITempUser } from "../interfaces";

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hasNoErrors = Object.values(error).every((err) => err === "");
    if (hasNoErrors && tempUser.login && tempUser.password && tempUser.confirmPassword) {
      dispatch(registerUser(tempUser.login, tempUser.password));
    }
    setError((prev) => ({
      loginInputError: tempUser.login ? prev.loginInputError : "login is required",
      passwordInputError: tempUser.password ? prev.passwordInputError : "Password is required",
      confirmPasswordInputError: tempUser.confirmPassword
        ? prev.confirmPasswordInputError
        : "Confirm password is required",
    }));
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
