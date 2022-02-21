import FormOption from "@/elements/formOption";
import LoginFormOption from "@/elements/loginFormOption";
import { profile } from "@/helpers/links";
import { validateAdress, validatePhone } from "@/helpers/validators";
import { saveProfile } from "@/redux/actions/userActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function InfoChangeForm() {
  const user = useSelector((state: RootReducerType) => state.user);
  const [userData, setuserData] = useState(() => ({
    login: user.login,
    description: user.description,
    phone: user.phone,
    adress: user.adress,
    photo: user.photo,
  }));
  const [error, setError] = useState({
    loginInputError: "",
    phoneInputError: "",
    adressInputError: "",
  });
  const dispatch = useDispatch();
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
    setuserData((prev) => ({
      ...prev,
      [name]: name === "photo" ? URL.createObjectURL(files[0]) : value,
    }));
  }
  function handleBlur(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "phone") {
      setError((prev) => ({
        ...prev,
        phoneInputError: validatePhone(value) || !value ? "" : "Wrong phone",
      }));
    }
    if (name === "adress") {
      setError((prev) => ({
        ...prev,
        adressInputError: validateAdress(value) || !value ? "" : "Wrong adress",
      }));
    }
  }
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (
      user.login === userData.login &&
      user.description === userData.description &&
      userData.adress === user.adress &&
      userData.phone === user.phone &&
      userData.photo === user.photo
    ) {
      return <Navigate to={profile} />;
    }
    const hasNoErrors = Object.values(error).every((err) => err === "");
    if (hasNoErrors) {
      dispatch(
        saveProfile(user.login, userData.login, userData.description, userData.phone, userData.adress, userData.photo)
      );
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
      <FormOption
        type="text"
        placeholder="Phone"
        value={userData.phone}
        inputName="phone"
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        // eslint-disable-next-line react/jsx-no-bind
        handleBlur={handleBlur}
        error={error.phoneInputError}
        hint="Ex. +375291234567"
      />
      <FormOption
        type="text"
        placeholder="Adress"
        value={userData.adress}
        inputName="adress"
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        error={error.adressInputError}
        // eslint-disable-next-line react/jsx-no-bind
        handleBlur={handleBlur}
        hint="Ex.253 N. Cherry St. "
      />
      <input type="file" accept="images/*" onChange={handleChange} name="photo" />
      <button className="profile__info-change-submit" type="submit">
        Change credetials
      </button>
    </form>
  );
}
