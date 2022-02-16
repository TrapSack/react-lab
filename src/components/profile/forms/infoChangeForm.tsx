import FormOption from "@/elements/formOption";
import { profile } from "@/helpers/links";
import { saveProfile } from "@/redux/actions/userActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function InfoChangeForm() {
  const user = useSelector((state: RootReducerType) => state.user);
  const [credentials, setCredentials] = useState(() => ({
    login: user.login,
    description: user.description,
  }));
  const [loginInputError, setLoginInputError] = useState("");
  const dispatch = useDispatch();
  function loginValidation(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value) {
      axios.get(`api/getUser/${value}`).then((res) => {
        setLoginInputError(() => (res.data && value !== user.login ? "User Already exists" : ""));
      });
    } else {
      setLoginInputError(`Login is required`);
    }
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "login") {
      loginValidation(event);
    }
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (user.login === credentials.login && user.description === credentials.description) {
      return <Navigate to={profile} />;
    }
    if (!loginInputError) {
      dispatch(saveProfile(user.login, credentials.login, credentials.description));
    }
    return <Navigate to={profile} />;
  }
  return (
    <form className="profile__info-change-form" onSubmit={handleSubmit}>
      <FormOption
        type="text"
        placeholder="Login"
        value={credentials.login}
        inputName="login"
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        error={loginInputError}
      />
      <FormOption
        type="text"
        placeholder="Description"
        value={credentials.description}
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
