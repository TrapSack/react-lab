import FormOption from "@/elements/formOption";
import LoginFormOption from "@/elements/loginFormOption";
import { profile } from "@/helpers/links";
import { saveProfile } from "@/redux/actions/userActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function InfoChangeForm() {
  const user = useSelector((state: RootReducerType) => state.user);
  const [userData, setuserData] = useState(() => ({
    login: user.login,
    description: user.description,
  }));
  const [error, setError] = useState({
    loginInputError: "",
  });
  const dispatch = useDispatch();
  function loginValidation(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value) {
      axios.get(`api/getUser/${value}`).then((res) => {
        setError(() => ({
          loginInputError: res.data && value !== user.login ? "User Already exists" : "",
        }));
      });
    } else {
      setError(() => ({
        loginInputError: "Login is required",
      }));
    }
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "login") {
      loginValidation(event);
    }
    setuserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (user.login === userData.login && user.description === userData.description) {
      return <Navigate to={profile} />;
    }
    if (!error.loginInputError) {
      dispatch(saveProfile(user.login, userData.login, userData.description));
    }
    return <Navigate to={profile} />;
  }
  return (
    <form className="profile__info-change-form" onSubmit={handleSubmit}>
      <LoginFormOption
        type="text"
        placeholder="Login"
        value={userData.login}
        inputName="login"
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        error={error.loginInputError}
        setError={setError}
      />
      <FormOption
        type="text"
        placeholder="Description"
        value={userData.description}
        inputName="description"
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
      />
      <button className="profile__info-change-submit" type="submit">
        Change credetials
      </button>
    </form>
  );
}
