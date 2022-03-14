import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerType } from "../../../redux/reducers/rootReducer";
import { changePassword } from "../../../redux/actions/userActions";
import ConfirmPasswordFormOption from "../../../elements/form-options/confirmPasswordFormOption";
import PasswordFormOption from "../../../elements/form-options/passwordFormOption";
import profile from "../profile.module.scss";

export default function PasswordChangeForm() {
  const [userData, setuserData] = useState(() => ({
    password: "",
    confirmPassword: "",
  }));

  const [error, setError] = useState({
    loginInputError: "",
    passwordInputError: "",
    confirmPasswordInputError: "",
    phoneInputError: "",
    adressInputError: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state: RootReducerType) => state.user);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setuserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const hasErrors = Object.values(error).every((err) => err === "");
    if (hasErrors && userData.password && userData.confirmPassword) {
      dispatch(changePassword(user.login, userData.password));
      setuserData({
        password: "",
        confirmPassword: "",
      });
    }
  }
  return (
    <form className={profile["profile__password-change-form"]} onSubmit={handleSubmit}>
      <PasswordFormOption
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        error={error.passwordInputError}
        value={userData.password}
        setError={setError}
      />
      <ConfirmPasswordFormOption
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        error={error.confirmPasswordInputError}
        value={userData.confirmPassword}
        setError={setError}
        passwordToConfirm={userData.password}
      />
      <button type="submit" className={profile["profile__password-change-confirm"]}>
        Change Password
      </button>
    </form>
  );
}
