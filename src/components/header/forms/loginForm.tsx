/* eslint-disable react/jsx-no-bind */
import FormOption from "@/elements/formOption";
import { asyncLogIn } from "@/redux/actions/userActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ITempUser } from "../interfaces";

interface IFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  redirectPath?: string;
}
// move to one component
export default function loginForm(props: IFormProps) {
  const [tempUser, setTempUser] = useState<ITempUser>(() => ({
    login: "",
    password: "",
  }));
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootReducerType) => state.user);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(asyncLogIn(tempUser.login, tempUser.password));
  }

  useEffect(() => {
    if (currentUser.login !== "") {
      props.setIsOpen(false);
      props.redirectPath && navigate(props.redirectPath, { replace: true });
    }
    setError(currentUser.error || "");
  }, [currentUser]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setTempUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="form form--login">
      <FormOption
        type="text"
        placeholder="Login"
        inputName="login"
        value={tempUser.login}
        handleChange={handleChange}
      />
      <FormOption
        type="password"
        placeholder="Password"
        inputName="password"
        value={tempUser.password}
        handleChange={handleChange}
        error={error}
      />
      <button type="submit" className="form__submit">
        Login
      </button>
    </form>
  );
}
