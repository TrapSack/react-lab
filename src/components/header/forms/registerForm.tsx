/* eslint-disable react/jsx-no-bind */
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/actions/userActions";
<<<<<<< HEAD
import ConfirmPasswordFormOption from "@/elements/form-options/confirmPasswordFormOption";
import LoginFormOption from "@/elements/form-options/loginFormOption";
import PasswordFormOption from "@/elements/form-options/passwordFormOption";
import AdressFormOption from "@/elements/form-options/adressFormOption";
=======

import ConfirmPasswordFormOption from "@/elements/confirmPasswordFormOption";
import LoginFormOption from "@/elements/loginFormOption";
import PasswordFormOption from "@/elements/passwordFormOption";

>>>>>>> aa79f219de96b92b69e1b5ec2b02459b297aec35
import { ChangeEvent, FormEvent, useState } from "react";
import PhoneFormOption from "@/elements/form-options/phoneFormOption";
import { ITempUser } from "../interfaces";

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
    <form onSubmit={handleSubmit} className="form form--register">
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        value={tempUser.confirmPassword!}
        handleChange={handleChange}
        error={error.confirmPasswordInputError}
        setError={setError}
        passwordToConfirm={tempUser.password}
      />
      <PhoneFormOption
        type="text"
        inputName="phone"
        placeholder="Phone"
        setError={setError}
        handleChange={handleChange}
        value={tempUser.phone}
        error={error.phoneInputError}
      />
      <AdressFormOption
        type="text"
        inputName="adress"
        placeholder="Adress"
        setError={setError}
        handleChange={handleChange}
        value={tempUser.adress}
        error={error.adressInputError}
      />
      <button type="submit" className="form__submit">
        Register
      </button>
    </form>
  );
}
