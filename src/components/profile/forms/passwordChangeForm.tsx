import { valiDatePassword } from "@/components/header/validators";
import FormOption from "@/elements/formOption";
import { ChangeEvent, useState } from "react";

export default function PasswordChangeForm() {
  const [credentials, setCredentials] = useState(() => ({
    password: "",
    confirmPassword: "",
  }));

  const [error, setError] = useState({
    passwordInputError: "",
    confirmPasswordInputError: "",
  });

  function passwordValidation(password: string) {
    setError((prev) => ({
      ...prev,
      passwordInputError:
        valiDatePassword(password) || !password
          ? ""
          : "Password length should be more than 8 sybmols, atleast one uppercase and lowercase symbol",
    }));
  }

  function confirmPasswordValidation(password: string) {
    setError((prev) => ({
      ...prev,
      confirmPasswordInputError: password === credentials.password ? "" : "Passwords don`t match",
    }));
  }
  function validation(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    switch (name) {
      case "password":
        passwordValidation(value);
        break;
      case "confirmPassword":
        confirmPasswordValidation(value);
        break;
      default:
        break;
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    validation(event);
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <form className="profile__password-change-form">
      <FormOption
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        type="password"
        inputName="password"
        placeholder="Password"
        error={error.passwordInputError}
        value={credentials.password}
      />
      <FormOption
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        type="password"
        inputName="confirmPassword"
        placeholder="Confirm Password"
        error={error.confirmPasswordInputError}
        value={credentials.confirmPassword}
      />
      <button type="submit" className="profile__password-change-confirm">
        Change Password
      </button>
    </form>
  );
}
