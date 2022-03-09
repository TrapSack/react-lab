/* eslint-disable react/jsx-no-bind */
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/actions/userActions";
import { getCartItems } from "@/redux/actions/cartItemsActions";
import ConfirmPasswordFormOption from "@/elements/form-options/confirmPasswordFormOption";
import LoginFormOption from "@/elements/form-options/loginFormOption";
import PasswordFormOption from "@/elements/form-options/passwordFormOption";
import AdressFormOption from "@/elements/form-options/adressFormOption";
import { ChangeEvent, FormEvent, useState } from "react";
import PhoneFormOption from "@/elements/form-options/phoneFormOption";
import { ITempUser } from "../interfaces";
import header from "../header.module.scss";

export default function RegisterForm() {
  const [error, setError] = useState({
    loginInputError: "",
    passwordInputError: "",
    confirmPasswordInputError: "",
    phoneInputError: "",
    adressInputError: "",
  });
  const dispatch = useDispatch();
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
    confirmPassword: "",
    adress: "",
    phone: "",
  }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hasNoErrors = Object.values(error).every((err) => err === "");
    if (hasNoErrors && tempUser.login && tempUser.password && tempUser.confirmPassword) {
      dispatch(registerUser(tempUser.login, tempUser.password, tempUser.phone, tempUser.adress));
      dispatch(getCartItems(tempUser.login));
    }
    setError((prev) => ({
      loginInputError: tempUser.login ? prev.loginInputError : "Login is required",
      passwordInputError: tempUser.password ? prev.passwordInputError : "Password is required",
      confirmPasswordInputError: tempUser.confirmPassword
        ? prev.confirmPasswordInputError
        : "Confirm password is required",
      phoneInputError: tempUser.phone ? prev.phoneInputError : "Phone is required",
      adressInputError: tempUser.adress ? prev.adressInputError : "Adress is required",
    }));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTempUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className={`${header.form} ${header["form--register"]}`}>
      <LoginFormOption
        value={tempUser.login}
        handleChange={handleChange}
        error={error.loginInputError}
        setError={setError}
      />
      <PasswordFormOption
        value={tempUser.password}
        handleChange={handleChange}
        error={error.passwordInputError}
        setError={setError}
      />
      <ConfirmPasswordFormOption
        value={tempUser.confirmPassword}
        handleChange={handleChange}
        error={error.confirmPasswordInputError}
        setError={setError}
        passwordToConfirm={tempUser.password}
      />
      <PhoneFormOption
        setError={setError}
        handleChange={handleChange}
        value={tempUser.phone}
        error={error.phoneInputError}
      />
      <AdressFormOption
        setError={setError}
        handleChange={handleChange}
        value={tempUser.adress}
        error={error.adressInputError}
      />
      <button type="submit" className={header.form__submit}>
        Register
      </button>
    </form>
  );
}
