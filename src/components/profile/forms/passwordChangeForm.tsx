import ConfirmPasswordFormOption from "@/elements/confirmPasswordFormOption";
import PasswordFormOption from "@/elements/passwordFormOption";
import { changePassword } from "@/redux/actions/userActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PasswordChangeForm() {
  const [credentials, setCredentials] = useState(() => ({
    password: "",
    confirmPassword: "",
  }));

  const [error, setError] = useState({
    passwordInputError: "",
    confirmPasswordInputError: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state: RootReducerType) => state.user);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
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
    }
  }
  return (
    <form className="profile__password-change-form" onSubmit={handleSubmit}>
      <PasswordFormOption
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        type="password"
        inputName="password"
        placeholder="Password"
        error={error.passwordInputError}
        value={credentials.password}
        setError={setError}
      />
      <ConfirmPasswordFormOption
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        type="password"
        inputName="confirmPassword"
        placeholder="Confirm Password"
        error={error.confirmPasswordInputError}
        value={credentials.confirmPassword}
        setError={setError}
        passwordToConfirm={credentials.password}
      />
      <button type="submit" className="profile__password-change-confirm">
        Change Password
      </button>
    </form>
  );
}
