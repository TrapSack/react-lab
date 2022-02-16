import { valiDatePassword } from "@/components/header/validators";
import FormOption from "@/elements/formOption";
import { changePassword } from "@/redux/actions/userActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PasswordChangeForm() {
  const [credentials, setCredentials] = useState(() => ({
    password: "",
    confirmPassword: "",
  }));

  const [successMessage, setSuccessMessage] = useState(() => "");

  const [error, setError] = useState({
    passwordInputError: "",
    confirmPasswordInputError: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state: RootReducerType) => state.user);

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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const hasErrors = Object.values(error).every((err) => err === "");
    if (hasErrors && credentials.password && credentials.confirmPassword) {
      dispatch(changePassword(user.login, credentials.password));
      setCredentials({
        password: "",
        confirmPassword: "",
      });
      setSuccessMessage("Your password has been changed");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
    }
  }
  return (
    <form className="profile__password-change-form" onSubmit={handleSubmit}>
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
      {successMessage && <p className="profile__password-change-submit-message">{successMessage}</p>}
      <button type="submit" className="profile__password-change-confirm">
        Change Password
      </button>
    </form>
  );
}
