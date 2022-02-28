import AdressFormOption from "@/elements/form-options/adressFormOption";
import FormOption from "@/elements/form-options/formOption";
import LoginFormOption from "@/elements/form-options/loginFormOption";
import PhoneFormOption from "@/elements/form-options/phoneFormOption";
import { saveProfile } from "@/redux/actions/userActions";
import { RootReducerType } from "@/redux/reducers/rootReducer";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InfoChangeForm(props: { setIsOpen: Dispatch<SetStateAction<boolean>> }) {
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
    const { name, value } = event.target;
    setuserData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      props.setIsOpen(false);
      return;
    }
    const hasNoErrors = Object.values(error).every((err) => err === "");
    if (hasNoErrors) {
      dispatch(
        saveProfile(user.login, userData.login, userData.description, userData.phone, userData.adress, userData.photo)
      );
    }
    props.setIsOpen(false);
  }
  return (
    <form className="profile__info-change-form" onSubmit={handleSubmit}>
      <LoginFormOption
        value={userData.login}
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
      <PhoneFormOption
        value={userData.phone}
        error={error.phoneInputError}
        setError={setError}
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
      />
      <AdressFormOption
        // eslint-disable-next-line react/jsx-no-bind
        handleChange={handleChange}
        setError={setError}
        error={error.adressInputError}
        value={userData.adress}
      />
      <input
        type="file"
        accept="images/*"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const reader = new FileReader();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          if (e!.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function read() {
              userData.photo = reader.result;
            };
            reader.onerror = function err(fileReaderError) {
              console.log("Error: ", fileReaderError);
            };
          }
        }}
        name="photo"
      />
      <button className="profile__info-change-submit" type="submit">
        Change credetials
      </button>
    </form>
  );
}
